// app/channel/[slug]/page.tsx
import { notFound } from "next/navigation";
import SmartPlayer from "@/components/SmartPlayer";
import ChannelCard from "@/components/channelCard";
import { Channel } from "@/types";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import FallbackImage from "@/components/FallbackImage";

// --- SEO Metadata Generator ---
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseURL}/api/channels?slug=${slug}`, {
    cache: "no-store",
  });

  const { data } = await res.json();
  const channel: Channel | undefined = data?.[0];

  if (!channel) {
    return {
      title: "Channel Not Found - FreePublicTV",
      description: "This channel is not available.",
    };
  }

  return {
    title: `Watch ${channel.name} Live | FreePublicTV`,
    description: `Watch ${channel.name} live online. Streaming from ${channel.country}.`,
    openGraph: {
      title: `${channel.name} | FreePublicTV`,
      description: `Stream ${channel.name} live in high quality. Public TV from ${channel.country}.`,
      images: channel.logo ? [channel.logo] : [`/default.svg`],
      type: "video.other",
      url: `${baseURL}/channel/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${channel.name} | FreePublicTV`,
      description: `Watch ${channel.name} streaming live.`,
      images: channel.logo ? [channel.logo] : [`/default.svg`],
    },
  };
}

// --- Main Channel Page ---
export default async function ChannelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseURL}/api/channels?slug=${slug}`, {
    cache: "no-store",
  });

  const { data } = await res.json();
  const channel: Channel | undefined = data?.[0];

  if (!channel) return notFound();

  // Suggestion logic
  const suggestURL = channel.categories?.length
    ? `${baseURL}/api/channels?category=${channel.categories[0]}&limit=4`
    : `${baseURL}/api/channels?country=${channel.country}&limit=4`;

  const suggestRes = await fetch(suggestURL, { cache: "no-store" });
  const { data: suggestions = [] } = await suggestRes.json();
  const filteredSuggestions = suggestions.filter(
    (ch: Channel) => ch.id !== channel.id
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-10 px-4 pb-4">
      <Breadcrumb channel={channel} />
      <section className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
        {/* Left: Player & Info */}
        <div>
          <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden shadow-lg">
            <div className="absolute inset-0">
              <SmartPlayer
                streams={channel.streams}
                autoPlay
                poster={channel.logo || "/default.svg"}
              />
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div className="flex flex-row items-start gap-4">
              <FallbackImage
                src={channel.logo || "/default.svg"}
                alt={channel.name}
                className="w-20 h-20 object-contain bg-white rounded p-2"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {channel.name}
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                  {channel.country} | {channel.language || "Unknown"}
                </p>
                {channel.website && (
                  <a
                    href={channel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm mt-2 inline-block"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Related Channels */}
        <aside className="lg:pt-2">
          <h2 className="text-lg font-semibold mb-4">Related Channels</h2>
          {filteredSuggestions.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredSuggestions.map((ch: Channel) => (
                <ChannelCard key={ch.id} channel={ch} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No related channels found.</p>
          )}
        </aside>
      </section>
    </main>
  );
}
