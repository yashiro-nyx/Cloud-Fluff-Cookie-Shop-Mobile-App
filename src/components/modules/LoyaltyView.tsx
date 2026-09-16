/**
 * @file LoyaltyView.tsx
 * @description Loyalty & Personalization Module
 * Features:
 * - Fluff Points tracking & membership tier status
 * - "Your Taste Profile" radar & flavor preferences
 * - Redeemable rewards (Free topping, Box upgrade, Birthday cookie)
 * - Personalized recommendation engine
 */

import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Gift,
  CheckCircle,
  TrendingUp,
  SlidersHorizontal,
  Cake,
  Star,
  Zap,
} from 'lucide-react';
import { TasteProfile } from '../../types';

interface LoyaltyViewProps {
  tasteProfile: TasteProfile;
  onOpenQuiz: () => void;
}

export const LoyaltyView: React.FC<LoyaltyViewProps> = ({
  tasteProfile,
  onOpenQuiz,
}) => {
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);

  const rewards = [
    {
      id: 'reward-topping',
      cost: 100,
      title: 'Free Gourmet Topping',
      desc: 'Add signature white heart frosting or salted caramel well to any build.',
      icon: Sparkles,
    },
    {
      id: 'reward-box',
      cost: 250,
      title: 'Collector Box Packaging Upgrade',
      desc: 'Complimentary upgrade to the limited pastel gift box.',
      icon: Gift,
    },
    {
      id: 'reward-birthday',
      cost: 0,
      title: 'Annual Member Birthday Cookie',
      desc: 'Free Midnight Choco Velvet cookie during your birth month!',
      icon: Cake,
      isSpecial: true,
    },
  ];

  const handleClaim = (rewardId: string) => {
    if (!claimedRewards.includes(rewardId)) {
      setClaimedRewards([...claimedRewards, rewardId]);
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Loyalty Header Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#523628] via-[#684635] to-[#4a3024] text-[#fff5f7] shadow-md relative overflow-hidden space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#fce7f3] text-[#523628]">
            {tasteProfile.tier}
          </span>
          <Award className="w-5 h-5 text-[#fce7f3]" />
        </div>

        <div>
          <span className="text-3xl font-black tracking-tight">{tasteProfile.fluffPoints}</span>
          <span className="text-xs text-[#fff5f7]/80 ml-2 font-semibold">Fluff Points Available</span>
          <p className="text-[11px] text-[#fff5f7]/70 mt-1">
            Earn 1 point per ₱10 spent on cookie orders and community likes.
          </p>
        </div>

        {/* Progress Bar to next tier */}
        <div className="pt-2 space-y-1">
          <div className="flex justify-between text-[10px] text-[#fff5f7]/80">
            <span>Next Tier: Fluff Master (500 pts)</span>
            <span className="font-bold">80 pts to go</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#fce7f3] to-[#fff5f7] rounded-full w-[84%]" />
          </div>
        </div>
      </div>

      {/* Taste Profile Radar / Analysis */}
      <div className="p-4 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#fce7f3] text-[#523628]">
              <Zap className="w-4 h-4 text-[#ec4899]" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a3024]">
                Your Taste Profile
              </h3>
              <p className="text-[10px] text-[#74513e]">Evolving flavor analysis</p>
            </div>
          </div>

          <button
            onClick={onOpenQuiz}
            className="h-8 px-3 rounded-full text-[11px] font-bold text-[#523628] bg-[#fce7f3] border border-[#fbcfe8] hover:bg-[#fbcfe8] transition flex items-center gap-1 cursor-pointer"
          >
            <SlidersHorizontal className="w-3 h-3 text-[#ec4899]" />
            <span>Retake Quiz</span>
          </button>
        </div>

        {/* Meter Bars */}
        <div className="space-y-2 pt-1 text-xs text-[#4a3024]">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span>Sweetness Intensity</span>
              <strong className="text-[#be185d]">Level {tasteProfile.sweetToothLevel}/5 (Semi-Sweet)</strong>
            </div>
            <div className="w-full h-2 rounded-full bg-[#fff5f7]">
              <div
                className="h-full bg-[#ec4899] rounded-full"
                style={{ width: `${(tasteProfile.sweetToothLevel / 5) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span>Cocoa Affinity</span>
              <strong className="text-[#be185d]">Deep Dark Cocoa (90%)</strong>
            </div>
            <div className="w-full h-2 rounded-full bg-[#fff5f7]">
              <div className="h-full bg-[#523628] rounded-full w-[90%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span>Crunch & Texture</span>
              <strong className="text-[#be185d]">Chewy Gooey Center (85%)</strong>
            </div>
            <div className="w-full h-2 rounded-full bg-[#fff5f7]">
              <div className="h-full bg-[#ec4899] rounded-full w-[85%]" />
            </div>
          </div>
        </div>

        {/* Favorite Mix-Ins Tags */}
        <div className="pt-2 border-t border-[#fbcfe8]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#74513e] block mb-1">
            Preferred Flavor Notes:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {tasteProfile.favoriteMixIns.map((mix, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#fff5f7] border border-[#fbcfe8] text-[#523628]"
              >
                {mix}
              </span>
            ))}
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Zero Peanut Allergens
            </span>
          </div>
        </div>
      </div>

      {/* Redeemable Rewards */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a3024] px-1">
          Redeem Points for Treats
        </h3>

        {rewards.map((r) => {
          const IconComp = r.icon;
          const isClaimed = claimedRewards.includes(r.id);
          const canAfford = tasteProfile.fluffPoints >= r.cost;

          return (
            <div
              key={r.id}
              className="p-3.5 rounded-2xl bg-white border border-[#fbcfe8] shadow-2xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    r.isSpecial ? 'bg-[#fce7f3] text-[#ec4899]' : 'bg-[#fff5f7] text-[#523628]'
                  }`}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#4a3024]">{r.title}</h4>
                  <p className="text-[10px] text-[#74513e] line-clamp-1">{r.desc}</p>
                  <span className="text-[10px] font-extrabold text-[#be185d]">
                    {r.cost === 0 ? 'FREE BDAY PERK' : `${r.cost} Fluff Points`}
                  </span>
                </div>
              </div>

              <button
                disabled={isClaimed || (!canAfford && r.cost > 0)}
                onClick={() => handleClaim(r.id)}
                className={`h-9 px-4 rounded-full text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer ${
                  isClaimed
                    ? 'bg-emerald-700 text-white'
                    : canAfford || r.cost === 0
                    ? 'bg-[#523628] text-[#fff5f7] hover:bg-[#684635]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isClaimed ? (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    <span>Claimed</span>
                  </>
                ) : (
                  <span>Redeem</span>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
