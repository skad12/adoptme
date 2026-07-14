"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Inline SVG fallback — never depends on Unsplash / next image proxy. */
export const LOCAL_IMAGE_FALLBACK =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" fill="none">
      <rect width="800" height="800" fill="#ECFDF5"/>
      <circle cx="400" cy="340" r="120" fill="#A7F3D0"/>
      <ellipse cx="400" cy="560" rx="180" ry="100" fill="#6EE7B7"/>
      <circle cx="355" cy="320" r="18" fill="#047857"/>
      <circle cx="445" cy="320" r="18" fill="#047857"/>
      <path d="M360 380c20 22 60 22 80 0" stroke="#047857" stroke-width="14" stroke-linecap="round"/>
      <path d="M280 250c-10-40 30-70 55-40" stroke="#10B981" stroke-width="20" stroke-linecap="round"/>
      <path d="M520 250c10-40-30-70-55-40" stroke="#10B981" stroke-width="20" stroke-linecap="round"/>
    </svg>`,
  );

function isUnsplash(src: string) {
  try {
    const host = new URL(src, "http://localhost").hostname;
    return host === "images.unsplash.com" || host.endsWith(".unsplash.com");
  } catch {
    return false;
  }
}

export function SafeImage({
  src,
  alt,
  className,
  sizes,
  fill,
  priority,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  const bypassOptimizer = isUnsplash(current) || current.startsWith("data:");

  return (
    <Image
      src={current}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      unoptimized={bypassOptimizer}
      className={cn("object-cover", className)}
      onError={() => {
        if (current !== LOCAL_IMAGE_FALLBACK) setCurrent(LOCAL_IMAGE_FALLBACK);
      }}
    />
  );
}
