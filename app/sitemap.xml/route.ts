import { Channel, Category } from "@/types";
import { NextResponse } from "next/server";
import { getAllCountries } from "@/lib/countryUtils";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://freepublictv.com";

async function fetchChannels(): Promise<Channel[]> {
  const res = await fetch(`${BASE_URL}/api/channels`, {
    next: { revalidate: 3600 },
  });
  const { data } = await res.json();
  return data || [];
}

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/api/categories`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data || [];
}

export async function GET() {
  const [channels, categories] = await Promise.all([
    fetchChannels(),
    fetchCategories(),
  ]);

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/dmca",
    "/disclaimer",
    "/policy",
    "/terms",
    "/category",
    "/country",
    "/channels",
  ];

  const staticUrls = staticRoutes.map(
    (path) => `<url><loc>${BASE_URL}${path}</loc></url>`
  );

  const channelUrls = channels
    .filter((ch) => !!ch.id)
    .map(
      (ch) =>
        `<url><loc>${BASE_URL}/channel/${
          ch.id
        }</loc><lastmod>${new Date().toISOString()}</lastmod></url>`
    );

  const categoryUrls = categories
    .filter((cat) => typeof cat.id === "string")
    .map(
      (cat) =>
        `<url><loc>${BASE_URL}/category/${cat.id.toLowerCase()}</loc></url>`
    );

  const countryUrls = getAllCountries().map(
    (c) => `<url><loc>${BASE_URL}/country/${c.slug}</loc></url>`
  );

  const urls = [...staticUrls, ...channelUrls, ...categoryUrls, ...countryUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
