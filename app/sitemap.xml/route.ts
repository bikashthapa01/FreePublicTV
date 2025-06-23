import { Channel } from "@/types";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://freepublictv.com";

async function fetchChannels() {
  const res = await fetch(`${BASE_URL}/api/channels`, {
    next: { revalidate: 3600 },
  });
  const { data } = await res.json();
  return data || [];
}

async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/api/categories`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data || [];
}

async function fetchCountries() {
  const res = await fetch(`${BASE_URL}/api/countries`, {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data || [];
}

export async function GET() {
  const [channels, categories, countries] = await Promise.all([
    fetchChannels(),
    fetchCategories(),
    fetchCountries(),
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

  const urls = [
    ...staticRoutes.map((path) => `<url><loc>${BASE_URL}${path}</loc></url>`),
    ...channels
      .filter((ch: Channel) => !!ch.id)
      .map(
        (ch: Channel) =>
          `<url><loc>${BASE_URL}/channel/${
            ch.id
          }</loc><lastmod>${new Date().toISOString()}</lastmod></url>`
      ),
    ...categories
      .filter((cat: any) => !!cat.slug)
      .map(
        (cat: any) => `<url><loc>${BASE_URL}/category/${cat.slug}</loc></url>`
      ),
    ...countries
      .filter((c: any) => !!c.slug)
      .map((c: any) => `<url><loc>${BASE_URL}/country/${c.slug}</loc></url>`),
  ];

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
