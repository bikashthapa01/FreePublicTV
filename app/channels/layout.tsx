// app/player/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Channels | FreePublicTV",
  description:
    "Browse and watch all channels available on FreePublicTV. Enjoy a wide range of live streams from various sources.",
  openGraph: {
    title: "All Channels | FreePublicTV",
    description:
      "Browse and watch all channels available on FreePublicTV. Enjoy a wide range of live streams from various sources.",
    url: "https://freepublictv.com/channels",
    images: ["/default.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Channels | FreePublicTV",
    description:
      "Browse and watch all channels available on FreePublicTV. Enjoy a wide range of live streams from various sources.",
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
