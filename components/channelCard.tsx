"use client";

import { Channel } from "@/types";
import Link from "next/link";
import { useMemo } from "react";
import countries from "world-countries";
import FallbackImage from "./FallbackImage";

export default function ChannelCard({ channel }: { channel: Channel }) {
  // Convert 2-letter country code to full country name
  const countryName = useMemo(() => {
    const match = countries.find((c) => c.cca2 === channel.country);
    return match?.name.common || channel.country;
  }, [channel.country]);

  return (
    <Link
      href={`/channel/${channel.id}`}
      className="group relative flex flex-col bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition duration-300"
    >
      {/* Logo Section */}
      <div className="relative w-full h-40 bg-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950 to-transparent z-0" />
        <FallbackImage
          src={channel.logo || ""}
          alt={channel.name}
          className="relative z-10 h-20 object-contain"
        />
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-1 p-3">
        <h3 className="text-white text-sm font-semibold truncate">
          {channel.name}
        </h3>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="truncate">{countryName}</span>
          <span className="capitalize truncate">
            {channel.category || "General"}
          </span>
        </div>
      </div>
    </Link>
  );
}
