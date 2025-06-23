// app/player/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Stream Player | FreePublicTV",
  description:
    "Test and preview live stream URLs (HLS, MPEG-DASH, MP4) using our smart player.",
  openGraph: {
    title: "Smart Stream Player | FreePublicTV",
    description:
      "Use FreePublicTV's smart player to test any valid video stream link.",
    url: "https://freepublictv.com/player",
    images: ["/default.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Stream Player | FreePublicTV",
    description: "Play and test .m3u8, .mpd, and .mp4 video streams instantly.",
    images: ["/default.svg"],
  },
};

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
