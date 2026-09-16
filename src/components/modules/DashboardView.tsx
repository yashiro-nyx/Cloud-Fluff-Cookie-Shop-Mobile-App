/**
 * @file DashboardView.tsx
 * @description Main Mobile Dashboard matching the video screenshot layout with a
 * pink-dominant palette, warm roasted cocoa typography, active delivery card,
 * three stat chips, and Popular House Cookies gallery.
 */

import React from 'react';
import {
  Sparkles,
  Plus,
  ArrowRight,
  Clock,
  Award,
  Truck,
  ChevronRight,
  Flame,
  Heart,
  ShoppingBag,
  Cookie as CookieIcon,
  CheckCircle2,
} from 'lucide-react';
import { PageId, CookieProduct, CustomCookieBuild, OrderRecord } from '../../types';

interface DashboardViewProps {
  onNavigate: (page: PageId) => void;
  featuredCookies?: CookieProduct[];
  featuredProducts?: CookieProduct[];
  communityTrending?: CustomCookieBuild[];
  activeOrder?: OrderRecord;
  fluffPoints?: number;
  onAddToCart: (product: CookieProduct) => void;
  onRemixCustom?: (build: CustomCookieBuild) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  featuredCookies,
  featuredProducts,
  communityTrending = [],
  activeOrder,
  fluffPoints = 420,
  onAddToCart,
}) => {
  const cookiesList = featuredCookies || featuredProducts || [];
  const popularHouseCookies = cookiesList.slice(0, 5);

  return (
    <div className="space-y-4 pb-12">
      {/* 1. HERO BANNER CARD (From Video Screenshot, Pink Dominant with Warm Cocoa) */}
      <section
        id="dashboard-hero-banner"
        className="p-5 rounded-[32px] bg-gradient-to-br from-[#fce7f3] via-[#fdf2f8] to-[#fad2e1] border-2 border-[#fbcfe8] relative overflow-hidden shadow-2xs"
      >
        {/* Decorative Floating Sprinkles / Sparkle elements */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#f472b6]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between gap-2">
          <div className="space-y-2 max-w-[220px]">
            {/* Pill: Freshly Baked Daily */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#fbcfe8] text-[10px] font-extrabold uppercase tracking-wider text-[#be185d] shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#ec4899]" />
              <span>Freshly Baked Daily</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl font-serif font-bold text-[#4a3024] leading-tight">
              Craving Warm,
              <br />
              Gooey Cookies?
            </h2>

            {/* Subhead */}
            <p className="text-[11px] text-[#74513e] leading-relaxed">
              Custom-bake your dream cookie or choose from our signature artisan lineup.
            </p>

            {/* Two Action Buttons from Video */}
            <div className="flex items-center gap-2 pt-2">
              <button
                id="btn-hero-build-cookie"
                onClick={() => onNavigate('cookie-builder')}
                className="h-9 px-3.5 rounded-full bg-[#523628] hover:bg-[#684635] text-[#fff5f7] text-[11px] font-bold transition-all shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span>Build My Cookie</span>
                <ArrowRight className="w-3 h-3 text-[#fbcfe8]" />
              </button>

              <button
                id="btn-hero-catalog"
                onClick={() => onNavigate('products')}
                className="h-9 px-3 rounded-full bg-white hover:bg-[#fce7f3] text-[#523628] border border-[#fbcfe8] text-[11px] font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
              >
                <span>Catalog</span>
              </button>
            </div>
          </div>

          {/* Right Hero Cookie Illustration from Video Screenshot (Cookie with white/pink heart frosting & choco chips) */}
          <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 mt-2 flex items-center justify-center">
            {/* Outer Orbiting Choco Chips & Sprinkles */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#ec4899]/30 animate-[spin_20s_linear_infinite]" />
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#523628]" />
            <span className="absolute bottom-1 right-2 w-2 h-2 rounded-full bg-[#523628]" />
            <span className="absolute top-4 left-1 w-1.5 h-1.5 rounded-full bg-[#ec4899]" />
            <span className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-[#f472b6]" />

            {/* Center Cookie Body */}
            <div className="w-20 h-20 rounded-full bg-[#74513e] p-1.5 shadow-md flex items-center justify-center border-2 border-[#523628]/20 relative overflow-hidden">
              {/* Crumb Texture */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8c6450] to-[#523628] flex items-center justify-center relative">
                {/* Floating Choco Chips */}
                <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#3b2419]" />
                <div className="absolute bottom-2 right-2.5 w-2.5 h-2.5 rounded-full bg-[#3b2419]" />
                <div className="absolute top-3 right-2 w-1.5 h-1.5 rounded-full bg-[#3b2419]" />
                <div className="absolute bottom-3.5 left-3 w-2 h-2 rounded-full bg-[#3b2419]" />

                {/* Center White / Soft Pink Heart Frosting */}
                <div className="w-9 h-9 rounded-full bg-white/95 shadow-inner flex items-center justify-center">
                  <Heart className="w-5 h-5 fill-[#fce7f3] text-[#ec4899]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ACTIVE DELIVERY CARD (From Video Screenshot) */}
      <section
        id="card-active-delivery"
        onClick={() => onNavigate('orders')}
        className="p-3.5 rounded-2xl bg-gradient-to-r from-[#fce7f3] via-[#fff0f4] to-[#fce7f3] border border-[#fbcfe8] flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Rounded Brown Square with Truck Icon */}
          <div className="w-10 h-10 rounded-xl bg-[#523628] text-[#fff5f7] flex items-center justify-center shrink-0 shadow-2xs">
            <Truck className="w-5 h-5 text-[#fbcfe8]" />
          </div>

          <div className="truncate">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-[#4a3024]">
                {activeOrder ? `Order #${activeOrder.orderId}` : 'Order #CF-8041'}
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#523628] text-[#fff5f7] font-bold shrink-0">
                {activeOrder ? activeOrder.status.replace('-', ' ') : 'Out for Delivery'}
              </span>
            </div>
            <p className="text-[11px] text-[#74513e] mt-0.5 flex items-center gap-1 truncate">
              <Clock className="w-3 h-3 text-[#ec4899] shrink-0" />
              <span>Arriving in ~14 mins at TIP Cubao</span>
            </p>
          </div>
        </div>

        <ChevronRight className="w-4 h-4 text-[#74513e] group-hover:translate-x-0.5 transition-transform shrink-0" />
      </section>

      {/* 3. THREE STAT CHIPS (From Video Screenshot) */}
      <section className="grid grid-cols-3 gap-2">
        {/* Stat 1: 420 Fluff Points */}
        <div
          onClick={() => onNavigate('loyalty')}
          className="p-3 rounded-2xl bg-white border border-[#fbcfe8] text-center space-y-1 shadow-2xs hover:border-[#f472b6] transition cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#fce7f3] text-[#ec4899] mx-auto flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <p className="text-base font-bold text-[#4a3024]">{fluffPoints}</p>
          <p className="text-[10px] text-[#74513e] font-medium leading-none">Fluff Points</p>
        </div>

        {/* Stat 2: 8 House Recipes */}
        <div
          onClick={() => onNavigate('products')}
          className="p-3 rounded-2xl bg-white border border-[#fbcfe8] text-center space-y-1 shadow-2xs hover:border-[#f472b6] transition cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#fef3c7] text-[#b45309] mx-auto flex items-center justify-center">
            <CookieIcon className="w-4 h-4" />
          </div>
          <p className="text-base font-bold text-[#4a3024]">8 House</p>
          <p className="text-[10px] text-[#74513e] font-medium leading-none">Recipes</p>
        </div>

        {/* Stat 3: 20+ Mix-Ins */}
        <div
          onClick={() => onNavigate('cookie-builder')}
          className="p-3 rounded-2xl bg-white border border-[#fbcfe8] text-center space-y-1 shadow-2xs hover:border-[#f472b6] transition cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-[#f3e8ff] text-[#7e22ce] mx-auto flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-base font-bold text-[#4a3024]">20+</p>
          <p className="text-[10px] text-[#74513e] font-medium leading-none">Mix-Ins</p>
        </div>
      </section>

      {/* 4. POPULAR HOUSE COOKIES (From Video Screenshot) */}
      <section className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-serif font-extrabold uppercase tracking-wide text-[#4a3024]">
              Popular House Cookies
            </h3>
            <p className="text-[11px] text-[#74513e]">
              Handcrafted batch recipes made fresh
            </p>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="text-xs font-bold text-[#be185d] hover:text-[#9d174d] flex items-center gap-0.5 cursor-pointer"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Scrolling Cards matching Video layout */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-1 px-1">
          {popularHouseCookies.map((cookie, idx) => (
            <div
              key={cookie.id}
              className="w-48 shrink-0 rounded-3xl bg-white border border-[#fbcfe8] overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              {/* Cookie Image with Badges */}
              <div className="relative h-32 w-full bg-[#fce7f3] overflow-hidden">
                <img
                  src={cookie.imageUrl}
                  alt={cookie.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Top Badge: Best Seller / Logo Star / House Classic */}
                <div className="absolute top-2 left-2">
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#523628]/90 backdrop-blur-xs text-[#fff5f7] shadow-xs">
                    {idx === 0 ? 'Best Seller' : idx === 1 ? 'Logo Star' : cookie.badge || 'Popular'}
                  </span>
                </div>

                {/* Price Pill in Bottom-Right of photo (from video) */}
                <div className="absolute bottom-2 right-2">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#fef3c7] text-[#523628] border border-[#fde68a] shadow-xs">
                    ₱{cookie.price}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 space-y-1 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#4a3024] truncate">{cookie.name}</h4>
                  <p className="text-[10px] text-[#74513e] line-clamp-1">
                    {cookie.flavorNotes || cookie.tagline}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-[#be185d] font-bold">
                    ⭐ {cookie.rating}
                  </span>

                  <button
                    onClick={() => onAddToCart(cookie)}
                    className="h-7 px-2.5 rounded-full bg-[#fce7f3] hover:bg-[#523628] text-[#523628] hover:text-[#fff5f7] border border-[#fbcfe8] text-[10px] font-bold transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FRESHNESS TRACKER & OVEN STATUS */}
      <section
        id="section-freshness-tracker"
        className="p-4 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs space-y-3"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#be185d]">
              OVEN-FRESH TRACKER
            </p>
            <h4 className="text-xs font-bold text-[#4a3024]">Batch #CF-2048 • Molten Center</h4>
          </div>
          <button
            onClick={() => onNavigate('orders')}
            className="text-xs font-bold text-[#be185d] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Live status</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Step Interactive Stepper */}
        <div className="relative pt-1 pb-1">
          <div className="flex items-center justify-between relative z-10">
            {/* Step 1: Order placed */}
            <div className="flex flex-col items-center text-center">
              <div className="w-7 h-7 rounded-full bg-[#fce7f3] text-[#ec4899] border-2 border-[#ec4899] flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-[#4a3024] mt-1.5">Order placed</span>
              <span className="text-[9px] text-[#74513e]">10:14 AM</span>
            </div>

            {/* Connecting Line 1 */}
            <div className="flex-1 h-0.5 bg-[#ec4899] -mt-5 mx-1" />

            {/* Step 2: Baking cookie (Active) */}
            <div className="flex flex-col items-center text-center">
              <div className="w-7 h-7 rounded-full bg-[#523628] text-[#fff5f7] flex items-center justify-center shadow-xs">
                <Flame className="w-3.5 h-3.5 text-[#f472b6]" />
              </div>
              <span className="text-[10px] font-extrabold text-[#4a3024] mt-1.5">Baking cookie</span>
              <span className="text-[9px] text-[#be185d] font-semibold">Oven 3 • Active</span>
            </div>

            {/* Connecting Line 2 */}
            <div className="flex-1 h-0.5 bg-[#fce7f3] -mt-5 mx-1" />

            {/* Step 3: Out for delivery */}
            <div className="flex flex-col items-center text-center opacity-60">
              <div className="w-7 h-7 rounded-full bg-[#fdf2f8] border border-[#fbcfe8] text-[#74513e] flex items-center justify-center">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-semibold text-[#4a3024] mt-1.5">Delivery</span>
              <span className="text-[9px] text-[#74513e]">~14 mins</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
