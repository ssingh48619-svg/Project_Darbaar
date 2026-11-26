import React from "react";

interface DarbaarCrestProps {
  className?: string;
  size?: number;
}

export function DarbaarCrest({ className = "w-8 h-8", size }: DarbaarCrestProps) {
  const sizeStyle = size ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={sizeStyle}
      aria-label="DARBAAR Royal Crest"
    >
      <defs>
        <linearGradient id="crestGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F2E3BC" />
          <stop offset="35%" stopColor="#C4AC79" />
          <stop offset="70%" stopColor="#A68A55" />
          <stop offset="100%" stopColor="#7B6132" />
        </linearGradient>

        <linearGradient id="crestDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#263A31" />
          <stop offset="50%" stopColor="#1B2A23" />
          <stop offset="100%" stopColor="#0E1712" />
        </linearGradient>

        <radialGradient id="crestGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C4AC79" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C4AC79" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Royal Medallion */}
      <rect
        x="5"
        y="5"
        width="110"
        height="110"
        rx="26"
        fill="url(#crestDarkGrad)"
        stroke="url(#crestGoldGrad)"
        strokeWidth="2.5"
      />

      {/* Inset Gold Filigree Border */}
      <rect
        x="11"
        y="11"
        width="98"
        height="98"
        rx="20"
        fill="none"
        stroke="url(#crestGoldGrad)"
        strokeWidth="1"
        strokeOpacity="0.55"
        strokeDasharray="3.5 3.5"
      />

      {/* Center Glow */}
      <circle cx="60" cy="60" r="44" fill="url(#crestGlow)" />

      {/* Corner Royal Finials */}
      <circle cx="16" cy="16" r="1.5" fill="#C4AC79" />
      <circle cx="104" cy="16" r="1.5" fill="#C4AC79" />
      <circle cx="16" cy="104" r="1.5" fill="#C4AC79" />
      <circle cx="104" cy="104" r="1.5" fill="#C4AC79" />

      {/* Royal Chhatri / Sovereign Crown */}
      <path
        d="M41 35 L45 25 L53 30 L60 19 L67 30 L75 25 L79 35 Z"
        fill="url(#crestGoldGrad)"
        stroke="#7B6132"
        strokeWidth="0.75"
      />
      <circle cx="45" cy="23.5" r="1.8" fill="#F2E3BC" />
      <circle cx="60" cy="17.5" r="2.4" fill="#FFFFFF" />
      <circle cx="75" cy="23.5" r="1.8" fill="#F2E3BC" />

      {/* Crown Base Band */}
      <rect x="40" y="35" width="40" height="4" rx="1.5" fill="url(#crestGoldGrad)" />
      <circle cx="45" cy="37" r="1" fill="#1B2A23" />
      <circle cx="52.5" cy="37" r="1" fill="#1B2A23" />
      <circle cx="60" cy="37" r="1" fill="#1B2A23" />
      <circle cx="67.5" cy="37" r="1" fill="#1B2A23" />
      <circle cx="75" cy="37" r="1" fill="#1B2A23" />

      {/* Imperial Court Monogram "D" */}
      <path
        d="M47 46 L47 84"
        stroke="url(#crestGoldGrad)"
        strokeWidth="5.5"
        strokeLinecap="square"
      />
      <line
        x1="41"
        y1="46"
        x2="53"
        y2="46"
        stroke="url(#crestGoldGrad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="41"
        y1="84"
        x2="53"
        y2="84"
        stroke="url(#crestGoldGrad)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <path
        d="M47 46 L64 46 C75.5 46 83 53.5 83 65 C83 76.5 75.5 84 64 84 L47 84"
        stroke="url(#crestGoldGrad)"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M54.5 54.5 L62.5 54.5 C69.5 54.5 74 58.5 74 65 C74 71.5 69.5 75.5 62.5 75.5 L54.5 75.5 Z"
        fill="#1B2A23"
        stroke="url(#crestGoldGrad)"
        strokeWidth="1.5"
      />

      {/* Lower Heritage Garland */}
      <path
        d="M33 82 C33 92.5 47 97.5 60 97.5 C73 97.5 87 92.5 87 82"
        stroke="url(#crestGoldGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Royal Star */}
      <polygon
        points="60,93 61.5,96.5 65,96.5 62.2,98.8 63.3,102 60,99.8 56.7,102 57.8,98.8 55,96.5 58.5,96.5"
        fill="url(#crestGoldGrad)"
      />

      {/* Celestial Flares */}
      <polygon
        points="25,60 26,61.8 28.2,61.8 26.5,63 27.2,65 25,63.6 22.8,65 23.5,63 21.8,61.8 24,61.8"
        fill="url(#crestGoldGrad)"
        opacity="0.75"
      />
      <polygon
        points="95,60 96,61.8 98.2,61.8 96.5,63 97.2,65 95,63.6 92.8,65 93.5,63 91.8,61.8 94,61.8"
        fill="url(#crestGoldGrad)"
        opacity="0.75"
      />
    </svg>
  );
}

