/**
 * @file AboutAppView.tsx
 * @description About the App Section
 * Explains purpose, features, objectives, academic context (TIP Cubao IT 005),
 * and the story behind the unique bitten chocolate cookie with heart frosting logo.
 */

import React from 'react';
import {
  Cookie,
  Target,
  Sparkles,
  GraduationCap,
  Heart,
  CheckCircle,
  Layers,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';
import { CookieLogo } from '../CookieLogo';

export const AboutAppView: React.FC = () => {
  const objectives = [
    'Provide an interactive, bespoke mobile ordering experience through a step-by-step Cookie Builder with live layer previews.',
    'Streamline real-time sales tracking, cookie inventory management, and fulfillment status for bakery operations.',
    'Foster community engagement through the user-created cookie recipe gallery, remixing, and monthly leaderboards.',
    'Deliver an authentic mobile e-commerce UX with responsive side navigation, aligned controls, and swift touch interactions.',
  ];

  const features = [
    {
      title: 'Ergonomic Side Drawer Navigation',
      desc: 'Intuitive navigation with quick module switching, active route highlighting, and cart/favorites badges.',
    },
    {
      title: 'Live Visual Cookie Builder',
      desc: 'Real-time graphic layering of dough, mix-ins, and gourmet toppings with auto-calculated pricing in Philippine Peso (₱).',
    },
    {
      title: 'Community Gallery & Recipe Remixing',
      desc: 'Social cookie showcase where customers upvote recipes and remix combinations directly into the builder.',
    },
    {
      title: 'Real-Time Oven-to-Door Order Tracking',
      desc: 'Multi-stage baking and delivery status monitoring with digital receipts and one-tap reordering.',
    },
    {
      title: 'Philippine Payment Methods',
      desc: 'Integrated checkout flows supporting GCash, Maya, Card, and Cash on Delivery (COD).',
    },
    {
      title: 'Taste Profile AI Flavor Matcher',
      desc: 'Personalized recommendation engine analyzing sweetness intensity and mix-in preferences.',
    },
  ];

  return (
    <div className="space-y-4 pb-12">
      {/* Brand Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#fff5f7] via-[#fce7f3] to-[#fff5f7] text-[#4a3024] border border-[#fbcfe8] shadow-2xs flex flex-col items-center text-center relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md border border-[#fbcfe8] mb-3">
          <CookieLogo size={52} animate />
        </div>

        <h1 className="text-xl font-black font-serif tracking-tight text-[#4a3024]">
          CLOUD FLUFFS
        </h1>
        <p className="text-xs text-[#be185d] font-semibold mt-0.5">
          Artisan Handcrafted Cookie Shop & Custom Baking Studio
        </p>

        <p className="text-[11px] text-[#74513e] mt-2 max-w-xs leading-relaxed">
          "A Mobile-Based Cookie Shop Application for Online Ordering and Sales Tracking"
        </p>
      </div>

      {/* Purpose & Mission */}
      <div className="p-4 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#fce7f3] text-[#523628]">
            <Target className="w-4 h-4 text-[#ec4899]" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#4a3024]">
            Purpose & Objectives
          </h2>
        </div>

        <p className="text-xs text-[#74513e] leading-relaxed">
          Cloud Fluffs was conceptualized and engineered exclusively for artisan cookies. By merging interactive mobile software ergonomics with gourmet cookie customization, the application empowers cookie lovers to design unique flavor combinations while giving bakeries automated ordering and fulfillment visibility.
        </p>

        <div className="space-y-1.5 pt-1">
          {objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[#74513e]">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Unique Logo Design Story */}
      <div className="p-4 rounded-3xl bg-[#fff5f7] border border-[#fbcfe8] shadow-2xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#fce7f3] text-[#523628]">
            <Heart className="w-4 h-4 text-[#ec4899]" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#4a3024]">
            Official Logo Design Story
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-white p-2 flex-shrink-0 flex items-center justify-center border border-[#fbcfe8] shadow-xs">
            <CookieLogo size={65} />
          </div>
          <div className="text-xs text-[#74513e] space-y-1 leading-relaxed">
            <p className="font-bold text-[#4a3024]">The Bitten Heart Dark Velvet Cookie</p>
            <p className="text-[11px]">
              Our unique logo embodies a rich chocolate cookie with a handcrafted white heart buttercream center, sprinkled with confectioner drops and marked with an irresistible bite mark on the top edge.
            </p>
          </div>
        </div>
      </div>

      {/* Core Features Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 px-1">
          <div className="p-1.5 rounded-lg bg-[#fce7f3] text-[#523628]">
            <Layers className="w-3.5 h-3.5 text-[#ec4899]" />
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#4a3024]">
            Key Mobile Architecture & Modules
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white border border-[#fbcfe8] shadow-2xs space-y-0.5"
            >
              <h4 className="text-xs font-bold text-[#4a3024] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899]" />
                {feat.title}
              </h4>
              <p className="text-[11px] text-[#74513e] pl-3 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
