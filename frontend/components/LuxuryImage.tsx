"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Sparkles } from "lucide-react";

interface LuxuryImageProps extends Omit<ImageProps, "onError"> {
  fallbackTitle?: string;
  categoryLabel?: string;
}

export function LuxuryImage({
  src,
  alt,
  className = "",
  fallbackTitle,
  categoryLabel,
  ...props
}: LuxuryImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#263A31] to-[#1B2A23] text-white overflow-hidden border border-[#A68A55]/30 ${className}`}>
        {/* Subtle royal geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C4AC79_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Gold royal frame corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C4AC79]/60"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C4AC79]/60"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#C4AC79]/60"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C4AC79]/60"></div>

        <div className="relative z-10 text-center space-y-2 max-w-xs">
          <div className="w-10 h-10 mx-auto rounded-full bg-[#111111] border border-[#C4AC79]/50 flex items-center justify-center text-[#C4AC79] shadow-inner">
            <Sparkles className="w-5 h-5 text-[#C4AC79]" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#C4AC79] font-medium">
            DARBAAR ARCHIVE
          </p>
          <p className="text-sm font-serif text-[#F7F5F0] font-normal leading-snug line-clamp-2">
            {fallbackTitle || alt || "Curated Asset Specimen"}
          </p>
          {categoryLabel && (
            <span className="inline-block text-[9px] uppercase tracking-widest text-[#EAE5DC]/60 pt-1">
              {categoryLabel}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}

