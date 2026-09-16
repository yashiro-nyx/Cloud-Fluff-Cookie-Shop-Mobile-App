/**
 * @file CommunityView.tsx
 * @description Community & Sharing Module
 * Public gallery of user-created cookie combos with upvoting,
 * "Remix this" recipe cloning, monthly leaderboard, and official menu candidacy.
 */

import React, { useState } from 'react';
import {
  Heart,
  RefreshCw,
  Award,
  Sparkles,
  Flame,
  CheckCircle,
  Share2,
  TrendingUp,
  Filter,
} from 'lucide-react';
import { CustomCookieBuild } from '../../types';
import { CookieVisualizer } from '../CookieVisualizer';

interface CommunityViewProps {
  creations: CustomCookieBuild[];
  onRemix: (build: CustomCookieBuild) => void;
  onLike: (id: string) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  creations,
  onRemix,
  onLike,
}) => {
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [filterMode, setFilterMode] = useState<'all' | 'candidates' | 'most-liked'>('all');

  const handleLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
    onLike(id);
  };

  const filtered = [...creations].sort((a, b) => {
    if (filterMode === 'most-liked') return b.likes - a.likes;
    return 0;
  }).filter((c) => {
    if (filterMode === 'candidates') return c.isOfficialCandidate;
    return true;
  });

  return (
    <div className="space-y-4 pb-12">
      {/* Header Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-[#fff5f7] via-[#fce7f3] to-[#fff5f7] text-[#4a3024] border border-[#fbcfe8] shadow-2xs flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#be185d] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#ec4899]" /> Cookie Baking Studio
          </span>
          <h1 className="text-base font-extrabold font-serif text-[#4a3024]">
            The Fluff Community Gallery
          </h1>
          <p className="text-[11px] text-[#74513e]">
            Browse and remix user recipes. Top voted becomes official menu cookies!
          </p>
        </div>
      </div>

      {/* Monthly Leaderboard Showcase (#1 Most Loved) */}
      {creations[0] && (
        <div className="p-4 rounded-3xl bg-white border-2 border-[#fbcfe8] shadow-xs space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#ec4899] text-white shadow-2xs">
              <Award className="w-3.5 h-3.5" /> #1 Voted Recipe of the Month
            </span>
            <span className="text-[10px] font-bold text-[#be185d]">
              Candidate for Official Menu
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center bg-[#fff5f7] rounded-2xl border border-[#fbcfe8]">
              <CookieVisualizer
                dough={creations[0].dough}
                mixIns={creations[0].mixIns}
                toppings={creations[0].toppings}
                size="regular"
                scale={0.55}
              />
            </div>

            <div className="flex-1 space-y-1">
              <h3 className="text-sm font-extrabold text-[#4a3024]">{creations[0].name}</h3>
              <p className="text-[11px] text-[#74513e]">
                Created by <strong>{creations[0].authorName}</strong>
              </p>
              <div className="flex items-center gap-2 text-[10px] text-[#74513e]">
                <span className="font-extrabold text-[#be185d] flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-[#ec4899] text-[#ec4899]" /> {creations[0].likes} votes
                </span>
                <span>• ₱{creations[0].totalPrice}</span>
                <span>• {creations[0].totalCalories} kcal</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#fbcfe8] flex items-center justify-between">
            <span className="text-[10px] text-[#74513e]">
              {creations[0].mixIns.map((m) => m.name.split(' ')[0]).join(', ')}
            </span>
            <button
              id="btn-remix-leaderboard"
              onClick={() => onRemix(creations[0])}
              className="h-9 px-4 rounded-full text-xs font-bold bg-[#523628] text-[#fff5f7] hover:bg-[#684635] active:scale-95 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Remix this Recipe</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: 'All Creations' },
          { id: 'most-liked', label: 'Most Upvoted' },
          { id: 'candidates', label: 'Official Menu Candidates' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilterMode(f.id as any)}
            className={`h-9 px-4 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              filterMode === f.id
                ? 'bg-[#ec4899] text-white shadow-2xs'
                : 'bg-white text-[#4a3024] border border-[#fbcfe8] hover:bg-[#fff5f7]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Community Creations List */}
      <div className="grid grid-cols-1 gap-3">
        {filtered.map((item) => {
          const isLiked = likedMap[item.id];
          return (
            <div
              key={item.id}
              id={`community-card-${item.id}`}
              className="p-4 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#4a3024]">{item.name}</h3>
                    {item.isOfficialCandidate && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#fce7f3] text-[#be185d]">
                        Menu Candidate
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#74513e] mt-0.5">
                    by <strong>{item.authorName}</strong> • {item.createdAt}
                  </p>
                </div>

                <button
                  id={`btn-like-${item.id}`}
                  onClick={() => handleLike(item.id)}
                  className={`flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-bold transition active:scale-90 cursor-pointer ${
                    isLiked
                      ? 'bg-[#fce7f3] text-[#be185d]'
                      : 'bg-[#fff5f7] text-[#74513e] border border-[#fbcfe8] hover:bg-[#fce7f3]'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#ec4899] text-[#ec4899]' : 'text-[#74513e]'}`}
                  />
                  <span>{item.likes + (isLiked ? 1 : 0)}</span>
                </button>
              </div>

              {/* Visualizer Thumbnail & Details */}
              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8]">
                <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
                  <CookieVisualizer
                    dough={item.dough}
                    mixIns={item.mixIns}
                    toppings={item.toppings}
                    size="regular"
                    scale={0.38}
                  />
                </div>

                <div className="flex-1 text-[11px] text-[#74513e] space-y-0.5">
                  <p>
                    <strong className="text-[#4a3024]">Dough:</strong> {item.dough.name}
                  </p>
                  <p className="line-clamp-1">
                    <strong className="text-[#4a3024]">Mix-ins:</strong>{' '}
                    {item.mixIns.map((m) => m.name.split(' ')[0]).join(', ') || 'None'}
                  </p>
                  <p className="line-clamp-1">
                    <strong className="text-[#4a3024]">Toppings:</strong>{' '}
                    {item.toppings.map((t) => t.name.split(' ')[0]).join(', ') || 'None'}
                  </p>
                </div>
              </div>

              {/* Card Bottom: Price, Calories & Remix Button */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="flex items-center gap-2 text-[11px] text-[#74513e]">
                  <span className="font-extrabold text-[#4a3024]">₱{item.totalPrice} PHP</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-[#be185d] font-semibold">
                    <Flame className="w-3 h-3 text-[#ec4899]" /> {item.totalCalories} kcal
                  </span>
                </div>

                <button
                  id={`btn-remix-${item.id}`}
                  onClick={() => onRemix(item)}
                  className="h-8 px-3 rounded-full text-xs font-bold bg-[#fce7f3] text-[#523628] border border-[#fbcfe8] hover:bg-[#fbcfe8] active:scale-95 transition flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#ec4899]" />
                  <span>Remix this</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
