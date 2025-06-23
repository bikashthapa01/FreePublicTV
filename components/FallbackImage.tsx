"use client";
import { useState } from "react";

type FallbackImageProps = {
  src?: string;
  alt?: string;
  className?: string;
};

export default function FallbackImage({
  src,
  alt = "image",
  className = "",
}: FallbackImageProps) {
  const [error, setError] = useState(false);

  const validSrc = !src || error ? "/default.svg" : src;

  return (
    <img
      src={validSrc}
      alt={alt}
      loading="lazy"
      onError={() => setError(true)}
      className={className}
    />
  );
}
