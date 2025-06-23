"use client";

import { Channel } from "@/types";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import FallbackImage from "./FallbackImage";

function shuffleArray<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function Hero({ channels }: { channels: Channel[] }) {
  const [index, setIndex] = useState(0);
  const [, setFade] = useState(true);

  const shuffledChannels = useMemo(() => {
    return channels.length > 1 ? shuffleArray(channels) : channels;
  }, [channels]);

  const current = shuffledChannels[index];

  useEffect(() => {
    if (shuffledChannels.length <= 1) return;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % shuffledChannels.length);
        setFade(true);
      }, 500);
    }, 6000);
    return () => clearInterval(timer);
  }, [shuffledChannels.length]);

  if (!current) return null;

  return (
    <section className="relative w-full overflow-hidden py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
        {/* LEFT: Info */}
        <div className="flex-1 space-y-5">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow">
            {current.name}
          </h1>
          <div className="text-slate-300 text-sm sm:text-base space-x-2">
            <span className="bg-slate-700 rounded px-2 py-1">
              {current.country}
            </span>
            <span className="bg-slate-700 rounded px-2 py-1 capitalize">
              {current.language || "Unknown"}
            </span>
            <span className="bg-slate-700 rounded px-2 py-1 capitalize">
              {current.category || "General"}
            </span>
          </div>
          <p className="text-slate-400 max-w-md text-sm sm:text-base">
            {current.description || "Streaming public content live & free."}
          </p>

          <Link
            href={`/channel/${current.id}`}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-semibold px-6 py-3 rounded-lg shadow transition"
          >
            ▶ Watch Now
          </Link>
        </div>

        {/* RIGHT: Logo with backdrop */}
        <div className="flex-1 flex justify-center items-center relative">
          <div className="absolute w-56 h-56 rounded-full bg-blue-500/10 blur-3xl z-0"></div>
          {current.logo ? (
            <FallbackImage
              src={current.logo}
              alt={current.name}
              className="relative z-10 h-40 object-contain drop-shadow-xl bg-white/5 p-4 rounded-lg"
            />
          ) : (
            <div className="relative z-10 h-40 w-40 flex items-center justify-center bg-slate-700 text-slate-300 text-sm rounded-lg">
              No Logo
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
