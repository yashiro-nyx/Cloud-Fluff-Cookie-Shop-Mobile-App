/**
 * @file CookieLogo.tsx
 * @description Official SVG Vector Logo matching Page 3 of the project PDF:
 * "Unique Logo Design: A bitten chocolate cookie with a white heart frosting center,
 * white chocolate chunks, sprinkles, and a bite mark on the top right edge."
 */

import React from 'react';

interface CookieLogoProps {
  className?: string;
  size?: number;
  animate?: boolean;
}

export const CookieLogo: React.FC<CookieLogoProps> = ({
  className = '',
  size = 48,
  animate = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animate ? 'hover:rotate-6 transition-transform duration-300' : ''}`}
    >
      <defs>
        {/* Soft shadow */}
        <filter id="cookie-drop-shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#3a261c" floodOpacity="0.35" />
        </filter>
        <radialGradient id="cookie-base-grad" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#6e4f3c" />
          <stop offset="70%" stopColor="#513627" />
          <stop offset="100%" stopColor="#3d261d" />
        </radialGradient>
        <radialGradient id="heart-grad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="85%" stopColor="#fcf0f2" />
          <stop offset="100%" stopColor="#f6d8d6" />
        </radialGradient>
      </defs>

      {/* Main Cookie Body with Bite Mark on Top-Right */}
      <path
        d="M 98 12 
           C 115 12, 130 18, 142 27
           C 142 38, 148 45, 158 45
           C 168 45, 175 38, 177 34
           C 183 48, 187 63, 188 78
           C 188 139, 139 188, 78 188
           C 25 188, 12 142, 12 98
           C 12 50, 48 12, 98 12 Z"
        fill="url(#cookie-base-grad)"
        filter="url(#cookie-drop-shadow)"
      />

      {/* Texture crumbs on the bite curve */}
      <circle cx="145" cy="29" r="2.5" fill="#fcf7d9" opacity="0.8" />
      <circle cx="156" cy="42" r="2" fill="#f0c5d4" />
      <circle cx="170" cy="38" r="3" fill="#fcf7d9" opacity="0.9" />
      <circle cx="182" cy="56" r="2.5" fill="#805f47" />

      {/* White chocolate chunks */}
      <rect x="42" y="48" width="14" height="11" rx="3" fill="#fffcf2" transform="rotate(18 42 48)" />
      <rect x="120" y="78" width="13" height="9" rx="3" fill="#fcf7d9" transform="rotate(-15 120 78)" />
      <rect x="48" y="125" width="12" height="10" rx="3" fill="#fffcf2" transform="rotate(32 48 125)" />
      <rect x="110" y="145" width="15" height="10" rx="3" fill="#fcf7d9" transform="rotate(-25 110 145)" />
      <rect x="135" y="115" width="11" height="8" rx="2.5" fill="#fffcf2" transform="rotate(12 135 115)" />

      {/* Dark chocolate chunks */}
      <circle cx="38" cy="88" r="7" fill="#2b1810" />
      <circle cx="75" cy="42" r="6" fill="#24140d" />
      <circle cx="85" cy="155" r="7" fill="#2b1810" />
      <circle cx="152" cy="138" r="6" fill="#24140d" />

      {/* Strawberry / Rose sprinkles */}
      <rect x="62" y="72" width="9" height="3.5" rx="1.5" fill="#f0c5d4" transform="rotate(45 62 72)" />
      <rect x="128" y="55" width="8" height="3" rx="1.5" fill="#f6d8d6" transform="rotate(-30 128 55)" />
      <rect x="68" y="132" width="9" height="3.5" rx="1.5" fill="#f6d8d6" transform="rotate(75 68 132)" />
      <rect x="132" y="100" width="8" height="3.2" rx="1.5" fill="#f0c5d4" transform="rotate(-60 132 100)" />
      <rect x="95" y="32" width="8" height="3" rx="1.5" fill="#fcf7d9" transform="rotate(10 95 32)" />

      {/* Center Signature White Heart Frosting */}
      <g filter="drop-shadow(0px 3px 4px rgba(42, 26, 17, 0.45))">
        <path
          d="M 98 114
             C 98 114, 65 92, 65 74
             C 65 62, 75 52, 87 52
             C 94 52, 98 57, 98 57
             C 98 57, 102 52, 109 52
             C 121 52, 131 62, 131 74
             C 131 92, 98 114, 98 114 Z"
          fill="url(#heart-grad)"
        />
        {/* Heart inner highlight */}
        <path
          d="M 76 65
             C 74 69, 74 74, 78 80"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
