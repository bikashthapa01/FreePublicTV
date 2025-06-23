// app/api/channels/route.ts
import { Channel, Stream } from "@/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category")?.trim().toLowerCase();
  const country = searchParams.get("country")?.trim().toUpperCase();
  const language = searchParams.get("language")?.trim().toLowerCase();
  const query = searchParams.get("q")?.trim().toLowerCase();
  const slug = searchParams.get("slug")?.trim();

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(
    50,
    Math.max(1, parseInt(searchParams.get("limit") || "12", 10))
  );
  const start = (page - 1) * limit;
  const end = start + limit;

  try {
    const [channelRes, streamRes, feedRes, langRes] = await Promise.all([
      fetch("https://iptv-org.github.io/api/channels.json"),
      fetch("https://iptv-org.github.io/api/streams.json"),
      fetch("https://iptv-org.github.io/api/feeds.json"),
      fetch("https://iptv-org.github.io/api/languages.json"),
    ]);

    const allChannels: Channel[] = await channelRes.json();
    const allStreams: Stream[] = await streamRes.json();
    const allFeeds = await feedRes.json(); // Feeds have language info
    const allLangs = await langRes.json(); // For language code-to-name mapping

    // Create map of channel ID to its language codes from feeds
    const langMapByChannel: Record<string, Set<string>> = {};
    for (const feed of allFeeds) {
      if (!feed.channel || !Array.isArray(feed.languages)) continue;
      if (!langMapByChannel[feed.channel])
        langMapByChannel[feed.channel] = new Set();
      feed.languages.forEach((code: string) =>
        langMapByChannel[feed.channel].add(code)
      );
    }

    // Map language codes to full names
    const codeToName = Object.fromEntries(
      allLangs.map((l: { code: string; name: string }) => [l.code, l.name])
    );

    // Map streams by channel ID
    const streamMap = new Map<string, Stream[]>();
    for (const stream of allStreams) {
      const id = stream.channel;
      if (!streamMap.has(id)) streamMap.set(id, []);
      streamMap.get(id)!.push(stream);
    }

    // Combine channel with streams and language
    const merged = allChannels
      .map((channel) => {
        const streams = streamMap.get(channel.id) || [];
        const langCodes = Array.from(langMapByChannel[channel.id] || []);
        const langNames = langCodes
          .map((code) => codeToName[code])
          .filter(Boolean);

        return streams.length > 0
          ? {
              ...channel,
              streams,
              languageCodes: langCodes,
              language: langNames.join(", ") || null,
            }
          : null;
      })
      .filter(Boolean) as (Channel & {
      streams: Stream[];
      languageCodes?: string[];
      language?: string;
    })[];

    // Apply filters
    let filtered = merged;

    if (category) {
      filtered = filtered.filter((ch) =>
        ch.categories?.some((cat) => cat.toLowerCase() === category)
      );
    }

    if (country) {
      filtered = filtered.filter((ch) => ch.country === country);
    }

    if (language) {
      filtered = filtered.filter((ch) => ch.languageCodes?.includes(language));
    }

    if (query) {
      filtered = filtered.filter((ch) =>
        ch.name?.toLowerCase().includes(query)
      );
    }

    if (slug) {
      filtered = filtered.filter((ch) => ch.id === slug);
    }

    const paginated = filtered.slice(start, end);

    return NextResponse.json({
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
      page,
      limit,
      data: paginated,
    });
  } catch (error) {
    console.error("Failed to process channels:", error);
    return NextResponse.json(
      { error: "Failed to fetch or merge channels" },
      { status: 500 }
    );
  }
}
