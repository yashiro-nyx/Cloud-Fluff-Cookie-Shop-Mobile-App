/**
 * @file FavoritesView.tsx
 * @description Curated Saved Favorites / Wishlist view for Cloud/Cookie Fluffs
 * with quick add to box, flavor tags, and AI match highlights.
 */

import React from 'react';
import { Heart, Plus, Trash2, Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { CookieProduct, PageId } from '../../types';

interface FavoritesViewProps {
  products: CookieProduct[];
  onAddToCart: (product: CookieProduct) => void;
  onNavigate: (page: PageId) => void;
  onShowToast: (msg: string) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  products,
  onAddToCart,
  onNavigate,
  onShowToast,
}) => {
  // Let's filter top favorite products by default (e.g. signature & highly rated)
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([
    'prod-midnight-choco',
    'prod-strawberry-cloud',
    'prod-caramel-hug',
  ]);

  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id));

  const handleRemoveFavorite = (id: string, name: string) => {
    setFavoriteIds((prev) => prev.filter((item) => item !== id));
    onShowToast(`Removed "${name}" from favorites`);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-[#fff5f7] via-[#fce7f3] to-[#fff5f7] border border-[#fbcfe8] shadow-2xs flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#be185d]">
            <Heart className="w-3.5 h-3.5 fill-[#ec4899] text-[#ec4899]" />
            <span>Curated Wishlist</span>
          </div>
          <h2 className="text-xl font-serif font-bold text-[#4a3024]">Saved Cookie Bakes</h2>
          <p className="text-[11px] text-[#74513e]">
            Quickly re-order your personal cookie crushes in a single tap.
          </p>
        </div>

        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-white border border-[#fbcfe8] text-[#523628] shadow-2xs">
          {favoriteProducts.length} Saved
        </span>
      </div>

      {/* Favorites List */}
      {favoriteProducts.length > 0 ? (
        <div className="space-y-3">
          {favoriteProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-3.5 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs flex items-center justify-between gap-3 hover:border-[#f472b6] hover:shadow-xs transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#fce7f3] shrink-0 border border-[#fbcfe8]">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-[#4a3024] truncate">{prod.name}</h3>
                    {prod.aiMatchScore && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#523628] text-white font-extrabold shrink-0 flex items-center gap-0.5">
                        <Sparkles className="w-2 h-2 text-[#f472b6]" /> {prod.aiMatchScore}%
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#be185d] font-semibold truncate mt-0.5">
                    {prod.flavorNotes}
                  </p>
                  <p className="text-xs font-serif font-extrabold text-[#4a3024] mt-1">
                    ₱{prod.price}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleRemoveFavorite(prod.id, prod.name)}
                  className="w-9 h-9 rounded-full bg-[#fff5f7] text-[#74513e]/60 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition cursor-pointer"
                  title="Remove from favorites"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onAddToCart(prod)}
                  className="h-9 px-4 rounded-full bg-[#fce7f3] text-[#523628] border border-[#fbcfe8] text-xs font-bold hover:bg-[#523628] hover:text-[#fff5f7] transition flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-white border border-[#fbcfe8] text-center space-y-3 shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#fce7f3] text-[#be185d] mx-auto flex items-center justify-center">
            <Heart className="w-6 h-6 text-[#ec4899]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#4a3024]">Your wishlist is empty</h3>
            <p className="text-xs text-[#74513e] mt-1 max-w-xs mx-auto">
              Tap the heart icon on any cookie in our signature menu to save it here for quick
              baking orders!
            </p>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="h-11 px-6 rounded-full bg-[#523628] text-white text-xs font-bold hover:bg-[#684635] transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Explore Cookie Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
