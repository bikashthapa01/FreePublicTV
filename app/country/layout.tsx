// app/country/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Channels by Country | FreePublicTV",
  description:
    "Discover public TV channels from every country around the world. Watch free and legal streams online.",
  openGraph: {
    title: "Browse Channels by Country | FreePublicTV",
    description:
      "Explore global TV streaming by country. Access legal public domain channels anywhere.",
    url: `https://freepublictv.com/country`,
  },
  twitter: {
    card: "summary_large_image",
    title: "FreePublicTV – Country-Based Channels",
    description: "Stream public TV by country. 100% free and legal.",
  },
};

export default function CountryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
