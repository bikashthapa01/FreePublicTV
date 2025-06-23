"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// ✅ Dynamically import SmartPlayer with SSR disabled
const SmartPlayer = dynamic(() => import("@/components/SmartPlayer"), {
  ssr: false,
});

const isValidStreamURL = (url: string): boolean => {
  const allowedExtensions = [".m3u8", ".mpd", ".mp4"];
  const isHttp = url.startsWith("http://") || url.startsWith("https://");
  return isHttp && allowedExtensions.some((ext) => url.includes(ext));
};

export default function PlayerPage() {
  const [url, setUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!isValidStreamURL(url.trim())) {
      setError(
        "Please enter a valid stream URL ending with .m3u8, .mpd, or .mp4"
      );
      return;
    }
    setSubmittedUrl(url.trim());
  };

  return (
    <main className="min-h-screen px-4 py-12 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-4">
            FreePublicTV Smart Player
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Enter a valid stream URL (.m3u8, .mpd, or .mp4) to watch instantly.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Enter stream URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition"
          >
            Load Player
          </button>
        </form>

        {error && (
          <div className="text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-200 p-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Player or Placeholder */}
        <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden shadow">
          {submittedUrl ? (
            <SmartPlayer
              streams={[{ url: submittedUrl }]}
              autoPlay
              muted
              poster="/default.svg"
            />
          ) : (
            <div className="text-slate-500 dark:text-slate-400 text-center px-6">
              <p className="text-lg font-semibold mb-1">Smart Player Preview</p>
              <p className="text-sm">
                Enter a stream URL above to load the player.
              </p>
            </div>
          )}
        </div>

        <section className="mt-16 text-center text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">
            What is FreePublicTV&apos;s Smart Player?
          </h2>
          <p className="mb-2">
            Supports live stream formats like HLS (.m3u8), MPEG-DASH (.mpd), and
            MP4 videos. Automatically detects and optimizes playback. Perfect
            for testing or watching live streams.
          </p>
        </section>
      </div>
    </main>
  );
}
