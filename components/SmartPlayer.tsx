"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import * as dashjs from "dashjs";

type Stream = {
  url: string;
  quality?: string;
};

type Props = {
  streams: Stream[];
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
};

export default function SmartPlayer({
  streams,
  poster,
  autoPlay = false,
  muted = false,
  loop = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeStream, setActiveStream] = useState<Stream | null>(null);
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);
  const [manual, setManual] = useState(false);

  // Initialize with first working stream
  useEffect(() => {
    if (streams.length > 0 && !activeStream) {
      setActiveStream(streams[0]);
    }
  }, [streams, activeStream]);

  // Stream playback logic
  useEffect(() => {
    if (!videoRef.current || !activeStream) return;

    const video = videoRef.current;
    const url = activeStream.url;
    const ext = url.split("?")[0].split(".").pop()?.toLowerCase() || "";

    let hls: Hls | null = null;
    let dashPlayer: dashjs.MediaPlayerClass | null = null;

    video.removeAttribute("src");
    video.load();

    if (ext === "m3u8") {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
      } else if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
      }
    } else if (ext === "mpd") {
      dashPlayer = dashjs.MediaPlayer().create();
      dashPlayer.initialize(video, url, autoPlay);
    } else {
      video.src = url;
    }

    return () => {
      hls?.destroy?.();
      dashPlayer?.reset?.();
    };
  }, [activeStream, autoPlay]);

  // Try next stream if error occurs
  const handleError = () => {
    const currentIndex = streams.findIndex((s) => s.url === activeStream?.url);
    const nextIndex = streams.findIndex(
      (_, i) => i > currentIndex && !errorIndexes.includes(i)
    );

    if (nextIndex !== -1) {
      setErrorIndexes((prev) => [...prev, currentIndex]);
      setActiveStream(streams[nextIndex]);
    }
  };

  return (
    <div className="w-full h-full relative">
      <video
        ref={videoRef}
        poster={poster}
        controls
        playsInline
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        onError={() => {
          if (!manual) handleError();
        }}
        className="w-full h-full object-cover rounded"
      />

      {/* Quality Selector */}
      {streams.length > 1 && (
        <div className="absolute top-2 right-2 z-10">
          <select
            onChange={(e) => {
              const selected = streams.find((s) => s.url === e.target.value);
              if (selected) {
                setManual(true);
                setActiveStream(selected);
              }
            }}
            value={activeStream?.url}
            className="bg-black/60 text-white text-xs px-2 py-1 rounded shadow-md backdrop-blur"
          >
            {streams.map((s, i) => (
              <option key={i} value={s.url}>
                {s.quality || `Stream ${i + 1}`}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
