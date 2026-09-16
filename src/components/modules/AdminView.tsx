/**
 * @file AdminView.tsx
 * @description Admin Management Module
 * From Project Specification:
 * - Sales Dashboard (Today's revenue in ₱, orders count, top custom combo)
 * - Catalog stock toggles (In stock vs Out of stock)
 * - Community moderation & promotion to official menu
 * - Ingredient & mix-in inventory levels
 */

import React, { useState } from 'react';
import {
  ShieldCheck,
  TrendingUp,
  DollarSign,
  PackageCheck,
  CheckCircle,
  AlertCircle,
  Award,
  ToggleLeft,
  ToggleRight,
  Flame,
} from 'lucide-react';
import { CookieProduct, CustomCookieBuild } from '../../types';

interface AdminViewProps {
  products: CookieProduct[];
  communityCreations: CustomCookieBuild[];
  onPromoteToOfficialMenu: (creation: CustomCookieBuild) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  products,
  communityCreations,
  onPromoteToOfficialMenu,
}) => {
  const [stockStatus, setStockStatus] = useState<Record<string, boolean>>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: true }), {})
  );
  const [promotedIds, setPromotedIds] = useState<string[]>([]);

  const toggleStock = (id: string) => {
    setStockStatus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePromote = (creation: CustomCookieBuild) => {
    setPromotedIds((prev) => [...prev, creation.id]);
    onPromoteToOfficialMenu(creation);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Admin Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#3a261c] to-[#25150e] text-[#fcf7d9] shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#f6d8d6]">
            Store Management Console
          </span>
          <h1 className="text-base font-extrabold font-serif text-[#fcf7d9]">
            Cloud Fluffs Admin Panel
          </h1>
          <p className="text-[11px] text-[#fcf7d9]/80">
            Real-time analytics, inventory & moderation
          </p>
        </div>
        <div className="p-2 rounded-xl bg-white/10 text-[#fcf7d9]">
          <ShieldCheck className="w-6 h-6 text-[#f6d8d6]" />
        </div>
      </div>

      {/* Sales Dashboard Metrics (Philippine Peso) */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 rounded-2xl bg-white border border-[#edd7c2] shadow-xs text-center">
          <span className="text-[10px] font-semibold text-[#604734]/70">Today Revenue</span>
          <p className="text-base font-black text-[#604734] mt-0.5">₱14,850</p>
          <span className="text-[9px] text-emerald-700 font-bold">+18% vs yesterday</span>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-[#edd7c2] shadow-xs text-center">
          <span className="text-[10px] font-semibold text-[#604734]/70">Orders Baked</span>
          <p className="text-base font-black text-[#604734] mt-0.5">86 Boxes</p>
          <span className="text-[9px] text-emerald-700 font-bold">100% on-time</span>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-[#edd7c2] shadow-xs text-center">
          <span className="text-[10px] font-semibold text-[#604734]/70">Top Mix-In</span>
          <p className="text-xs font-black text-[#604734] mt-1 truncate">Belgian Dark</p>
          <span className="text-[9px] text-[#604734]/60">64% of builds</span>
        </div>
      </div>

      {/* Community Creation Moderation & Official Menu Promotion */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#edd7c2] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#bc6c25]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#604734]">
              Community Menu Moderation
            </h3>
          </div>
          <span className="text-[10px] font-semibold text-[#604734]/60">
            Promote to Official Menu
          </span>
        </div>

        <div className="space-y-2">
          {communityCreations.map((item) => {
            const isPromoted = promotedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="p-2.5 rounded-xl bg-[#fcf7d9]/60 border border-[#edd7c2] flex items-center justify-between gap-2"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#604734]">{item.name}</h4>
                  <p className="text-[10px] text-[#604734]/70">
                    by <strong>{item.authorName}</strong> • {item.likes} votes • ₱{item.totalPrice}
                  </p>
                </div>

                <button
                  disabled={isPromoted}
                  onClick={() => handlePromote(item)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
                    isPromoted
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#604734] text-[#fcf7d9] hover:bg-[#4d3627]'
                  }`}
                >
                  {isPromoted ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      <span>Promoted</span>
                    </>
                  ) : (
                    <span>Promote to Menu</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inventory & Stock Toggles */}
      <div className="p-3.5 rounded-2xl bg-white border border-[#edd7c2] shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <PackageCheck className="w-4 h-4 text-[#bc6c25]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#604734]">
              Catalog Inventory Status
            </h3>
          </div>
          <span className="text-[10px] font-bold text-emerald-800">Live Kitchen Sync</span>
        </div>

        <div className="space-y-2">
          {products.map((p) => {
            const isInStock = stockStatus[p.id];
            return (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 rounded-xl bg-[#fcf7d9]/40 border border-[#edd7c2]"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#604734] leading-none">{p.name}</p>
                    <p className="text-[9px] text-[#604734]/60 mt-0.5">₱{p.price} PHP</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleStock(p.id)}
                  className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md transition ${
                    isInStock
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {isInStock ? 'In Stock' : 'Sold Out'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
