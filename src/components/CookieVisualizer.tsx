/**
 * @file CookieVisualizer.tsx
 * @description Dynamic layered visual representation of a cookie based on chosen dough,
 * mix-ins, and toppings. Updates in real-time as users customize their cookie.
 */

import React from 'react';
import { DoughOption, MixInOption, ToppingOption } from '../types';

interface CookieVisualizerProps {
  dough: DoughOption;
  mixIns: MixInOption[];
  toppings: ToppingOption[];
  size?: 'regular' | 'chunky' | 'monster';
  scale?: number;
  className?: string;
}

export const CookieVisualizer: React.FC<CookieVisualizerProps> = ({
  dough,
  mixIns,
  toppings,
  size = 'regular',
  scale = 1,
  className = '',
}) => {
  const hasHeartFrosting = toppings.some((t) => t.id === 'top-heart-frosting');
  const hasSeaSalt = toppings.some((t) => t.id === 'top-sea-salt');
  const hasFudgeDrizzle = toppings.some((t) => t.id === 'top-fudge-drizzle');
  const hasSprinkles = toppings.some((t) => t.id === 'top-sprinkles');
  const hasCaramelCore = toppings.some((t) => t.id === 'top-caramel-core');
  const hasBiteMark = toppings.some((t) => t.id === 'top-bitten-edge');

  // Dimension based on size
  const baseSize = size === 'monster' ? 220 : size === 'chunky' ? 195 : 170;
  const dimension = baseSize * scale;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 drop-shadow-xl"
      >
        <defs>
          <filter id={`shadow-${dough.id}`} x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#2a170f" floodOpacity="0.4" />
          </filter>

          {/* Dough Gradient */}
          <radialGradient id={`dough-grad-${dough.id}`} cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor={dough.color} />
            <stop offset="65%" stopColor={dough.color} stopOpacity="0.92" />
            <stop offset="100%" stopColor="#25140d" stopOpacity="0.8" />
          </radialGradient>

          {/* Caramel Well Gradient */}
          <radialGradient id="caramel-well" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#ffd166" />
            <stop offset="60%" stopColor="#c57d34" />
            <stop offset="100%" stopColor="#7a4419" />
          </radialGradient>
        </defs>

        {/* Base Cookie Shape (with or without bite mark) */}
        {hasBiteMark ? (
          <path
            d="M 98 12 
               C 115 12, 130 18, 142 27
               C 142 38, 148 45, 158 45
               C 168 45, 175 38, 177 34
               C 183 48, 187 63, 188 78
               C 188 139, 139 188, 78 188
               C 25 188, 12 142, 12 98
               C 12 50, 48 12, 98 12 Z"
            fill={`url(#dough-grad-${dough.id})`}
            filter={`url(#shadow-${dough.id})`}
          />
        ) : (
          <ellipse
            cx="100"
            cy="100"
            rx="88"
            ry="88"
            fill={`url(#dough-grad-${dough.id})`}
            filter={`url(#shadow-${dough.id})`}
          />
        )}

        {/* Crumb and cracked dough texture rings */}
        <path
          d="M 45 65 Q 60 70 55 90"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 125 140 Q 140 135 150 150"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="50" cy="130" r="3" fill="rgba(255,255,255,0.2)" />
        <circle cx="150" cy="70" r="4" fill="rgba(0,0,0,0.15)" />
        <circle cx="75" cy="160" r="3" fill="rgba(255,255,255,0.15)" />

        {/* Caramel Core center (if chosen) */}
        {hasCaramelCore && (
          <ellipse cx="100" cy="100" rx="28" ry="24" fill="url(#caramel-well)" />
        )}

        {/* Mix-Ins Layering */}
        {mixIns.map((mix, idx) => {
          if (mix.id === 'mix-belgian-dark') {
            return (
              <g key={idx}>
                <rect x="55" y="48" width="16" height="13" rx="4" fill={mix.color} transform="rotate(15 55 48)" />
                <rect x="125" y="65" width="18" height="14" rx="4" fill={mix.color} transform="rotate(-20 125 65)" />
                <rect x="70" y="125" width="17" height="14" rx="4" fill={mix.color} transform="rotate(35 70 125)" />
                <rect x="135" y="120" width="15" height="12" rx="3.5" fill={mix.color} transform="rotate(-10 135 120)" />
              </g>
            );
          }
          if (mix.id === 'mix-white-drops') {
            return (
              <g key={idx}>
                <circle cx="48" cy="85" r="7" fill={mix.color} />
                <circle cx="110" cy="50" r="8" fill={mix.color} />
                <circle cx="140" cy="105" r="7.5" fill={mix.color} />
                <circle cx="105" cy="145" r="8" fill={mix.color} />
                <circle cx="65" cy="105" r="7" fill={mix.color} />
              </g>
            );
          }
          if (mix.id === 'mix-cashew' || mix.id === 'mix-walnut') {
            return (
              <g key={idx}>
                <path d="M 60 70 C 65 65, 80 68, 75 80 C 70 90, 55 85, 60 70 Z" fill={mix.color} />
                <path d="M 120 130 C 125 125, 140 128, 135 140 C 130 150, 115 145, 120 130 Z" fill={mix.color} />
                <path d="M 130 45 C 135 40, 145 42, 142 52 C 138 60, 128 55, 130 45 Z" fill={mix.color} />
              </g>
            );
          }
          if (mix.id === 'mix-marshmallow') {
            return (
              <g key={idx}>
                <rect x="80" y="60" width="18" height="15" rx="6" fill="#ffffff" stroke="#f6d8d6" strokeWidth="1.5" />
                <rect x="45" y="115" width="16" height="14" rx="5" fill="#ffffff" stroke="#f6d8d6" strokeWidth="1.5" />
                <rect x="125" y="90" width="17" height="14" rx="5" fill="#ffffff" stroke="#f6d8d6" strokeWidth="1.5" />
              </g>
            );
          }
          if (mix.id === 'mix-cranberry') {
            return (
              <g key={idx}>
                <ellipse cx="65" cy="55" rx="7" ry="5" fill="#780000" transform="rotate(25 65 55)" />
                <ellipse cx="140" cy="80" rx="8" ry="6" fill="#780000" transform="rotate(-30 140 80)" />
                <ellipse cx="90" cy="135" rx="7" ry="5.5" fill="#780000" transform="rotate(15 90 135)" />
              </g>
            );
          }
          if (mix.id === 'mix-chocnut' || mix.id === 'mix-caramel-chips') {
            return (
              <g key={idx}>
                <polygon points="50,95 58,100 52,108 44,103" fill={mix.color} />
                <polygon points="120,70 130,73 126,82 118,78" fill={mix.color} />
                <polygon points="100,120 110,124 105,133 96,128" fill={mix.color} />
                <polygon points="145,130 152,133 149,141 142,138" fill={mix.color} />
              </g>
            );
          }
          return null;
        })}

        {/* Fudge Drizzle */}
        {hasFudgeDrizzle && (
          <g stroke="#30190f" strokeWidth="4" strokeLinecap="round" opacity="0.9">
            <path d="M 40 80 Q 70 60 100 85 T 160 75" fill="none" />
            <path d="M 35 110 Q 80 95 115 120 T 165 110" fill="none" />
            <path d="M 50 140 Q 95 130 130 150 T 155 140" fill="none" />
          </g>
        )}

        {/* Rainbow Sprinkles */}
        {hasSprinkles && (
          <g>
            <rect x="55" y="70" width="8" height="3" rx="1.5" fill="#f0c5d4" transform="rotate(40 55 70)" />
            <rect x="85" y="45" width="8" height="3" rx="1.5" fill="#fcf7d9" transform="rotate(-20 85 45)" />
            <rect x="130" y="60" width="8" height="3" rx="1.5" fill="#a7c957" transform="rotate(60 130 60)" />
            <rect x="70" y="110" width="8" height="3" rx="1.5" fill="#90e0ef" transform="rotate(-45 70 110)" />
            <rect x="145" y="110" width="8" height="3" rx="1.5" fill="#f6d8d6" transform="rotate(30 145 110)" />
            <rect x="110" y="150" width="8" height="3" rx="1.5" fill="#fcf7d9" transform="rotate(-65 110 150)" />
          </g>
        )}

        {/* Signature White Heart Frosting Topping */}
        {hasHeartFrosting && (
          <g filter="drop-shadow(0px 3px 5px rgba(35, 18, 12, 0.45))">
            <path
              d="M 100 120
                 C 100 120, 68 96, 68 76
                 C 68 64, 78 54, 90 54
                 C 96 54, 100 59, 100 59
                 C 100 59, 104 54, 110 54
                 C 122 54, 132 64, 132 76
                 C 132 96, 100 120, 100 120 Z"
              fill="#ffffff"
            />
            {/* Glossy reflection */}
            <path
              d="M 78 68 C 76 72, 76 77, 80 82"
              stroke="#f6d8d6"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {/* Sea Salt Flakes */}
        {hasSeaSalt && (
          <g fill="#ffffff" opacity="0.95">
            <rect x="85" y="75" width="4.5" height="4.5" transform="rotate(25 85 75)" />
            <rect x="120" y="90" width="5" height="5" transform="rotate(-15 120 90)" />
            <rect x="75" y="130" width="4" height="4" transform="rotate(40 75 130)" />
            <rect x="115" y="135" width="4.5" height="4.5" transform="rotate(10 115 135)" />
          </g>
        )}
      </svg>

      {/* Floating Size Badge */}
      <span className="absolute bottom-1 right-2 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-[#604734] text-[#fcf7d9] shadow">
        {size} ({size === 'monster' ? '150g' : size === 'chunky' ? '110g' : '80g'})
      </span>
    </div>
  );
};
