/**
 * @file ProductCatalogView.tsx
 * @description Cookie Catalog strictly exclusive to cookies with AI Flavor Sommelier,
 * aligned buttons, responsive hover states, and the pink-dominant artisan color palette.
 */

import React, { useState, useMemo } from 'react';
import {
  Search,
  ShoppingBag,
  Sparkles,
  X,
  Plus,
  Check,
  AlertCircle,
  Heart,
  Wand2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CookieProduct, CookieCategory } from '../../types';

interface ProductCatalogViewProps {
  products: CookieProduct[];
  onAddToCart: (product: CookieProduct) => void;
  onCustomizeInBuilder?: (product: CookieProduct) => void;
  onOpenCustomBuilder?: () => void;
}

type AIMood = 'all' | 'midnight' | 'berry' | 'caramel' | 'zen' | 'surprise';

export const ProductCatalogView: React.FC<ProductCatalogViewProps> = ({
  products,
  onAddToCart,
  onCustomizeInBuilder,
  onOpenCustomBuilder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CookieCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState<CookieProduct | null>(null);
  const [addedEffectId, setAddedEffectId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    'prod-midnight-choco': true,
    'prod-strawberry-cloud': true,
  });

  // AI Flavor Co-pilot State
  const [selectedMood, setSelectedMood] = useState<AIMood>('all');
  const [expandedSensoryId, setExpandedSensoryId] = useState<string | null>(null);

  const categories: { id: CookieCategory; label: string }[] = [
    { id: 'all', label: 'All Cookies' },
    { id: 'indulgent', label: 'Indulgent' },
    { id: 'fruity', label: 'Fruity & Pink' },
    { id: 'classic', label: 'Classic' },
    { id: 'nutty', label: 'Nutty & Caramel' },
    { id: 'dietary', label: 'Dietary' },
  ];

  const aiMoods: { id: AIMood; label: string; icon: string; prompt: string }[] = [
    { id: 'midnight', label: 'Midnight Energy', icon: '🌙', prompt: 'Deep cocoa & dark indulgence' },
    { id: 'berry', label: 'Sweet & Berry', icon: '🍓', prompt: 'Strawberry tartness & marshmallow fluff' },
    { id: 'caramel', label: 'Cozy Caramel', icon: '☕', prompt: 'Roasted pecans & buttery caramel warmth' },
    { id: 'zen', label: 'Mindful Matcha', icon: '🍵', prompt: 'Ceremonial green tea & ube balance' },
    { id: 'surprise', label: 'AI Surprise Pick', icon: '✨', prompt: 'AI Algorithm chosen high-dopamine cookie' },
  ];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesQuery =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.flavorNotes && p.flavorNotes.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesMood = true;
      if (selectedMood === 'midnight') {
        matchesMood = p.id.includes('midnight') || p.category === 'indulgent';
      } else if (selectedMood === 'berry') {
        matchesMood = p.id.includes('strawberry') || p.id.includes('pink') || p.category === 'fruity';
      } else if (selectedMood === 'caramel') {
        matchesMood = p.id.includes('caramel') || p.category === 'nutty';
      } else if (selectedMood === 'zen') {
        matchesMood = p.id.includes('matcha') || p.category === 'classic';
      }

      return matchesCategory && matchesQuery && matchesMood;
    });
  }, [products, selectedCategory, searchQuery, selectedMood]);

  const handleQuickAdd = (product: CookieProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedEffectId(product.id);
    setTimeout(() => setAddedEffectId(null), 1200);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 1. Top Promo Banners Carousel */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 pt-1">
        {/* Banner 1 */}
        <div className="min-w-[285px] sm:min-w-[320px] rounded-3xl bg-[#fff5f7] border border-[#fbcfe8] p-4 relative flex items-center justify-between shadow-2xs">
          <div className="space-y-1 max-w-[185px]">
            <span className="inline-flex items-center gap-1 text-[9px] font-extrabold tracking-wider text-[#be185d] uppercase">
              <Sparkles className="w-3 h-3 text-[#ec4899]" /> FRESH FROM THE OVEN
            </span>
            <h3 className="text-base font-serif font-bold text-[#4a3024] leading-snug">
              Pick your happy cookie.
            </h3>
            <p className="text-[11px] text-[#74513e] line-clamp-2">
              Explore signature cookie recipes made for midnight cravings, gifting, and sweet joy.
            </p>
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#fbcfe8] bg-[#fce7f3] shrink-0 shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&auto=format&fit=crop&q=80"
              alt="Cookie"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Banner 2 */}
        <div className="min-w-[285px] sm:min-w-[320px] rounded-3xl bg-gradient-to-r from-[#fce7f3] to-[#fdf2f8] border border-[#fbcfe8] p-4 relative flex items-center justify-between shadow-2xs">
          <div className="space-y-1 max-w-[185px]">
            <span className="text-[9px] font-extrabold tracking-wider text-[#be185d] uppercase">
              THE COOKIE FLUFFS MENU
            </span>
            <h3 className="text-base font-serif font-bold text-[#4a3024] leading-snug">
              Goodness, in every bite.
            </h3>
            <p className="text-[11px] text-[#74513e] line-clamp-2">
              Small-batch artisan cookies with big heart and radical flavor warmth.
            </p>
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#fbcfe8] bg-white shrink-0 shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&auto=format&fit=crop&q=80"
              alt="Pink Berry Cookie"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 2. Interactive AI Flavor Sommelier / Co-Pilot */}
      <section className="p-3.5 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#523628] text-[#fff5f7] flex items-center justify-center shadow-2xs">
              <Wand2 className="w-3.5 h-3.5 text-[#f472b6]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#4a3024] uppercase tracking-wider flex items-center gap-1.5">
                <span>AI Flavor Sommelier</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#ec4899] text-white font-extrabold">
                  SMART
                </span>
              </h4>
              <p className="text-[10px] text-[#74513e]">Select your vibe to match handcrafted cookies</p>
            </div>
          </div>

          {selectedMood !== 'all' && (
            <button
              onClick={() => setSelectedMood('all')}
              className="text-[10px] font-bold text-[#be185d] hover:underline cursor-pointer"
            >
              Reset AI
            </button>
          )}
        </div>

        {/* AI Mood Pills with responsive hover and aligned sizing */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {aiMoods.map((mood) => {
            const isActive = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                id={`ai-mood-${mood.id}`}
                onClick={() => setSelectedMood(isActive ? 'all' : mood.id)}
                className={`h-8 px-3 rounded-full text-[11px] font-bold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#523628] text-[#fff5f7] shadow-xs scale-[1.02]'
                    : 'bg-[#fff5f7] text-[#4a3024] border border-[#fbcfe8] hover:bg-[#fce7f3] hover:scale-[1.02]'
                }`}
              >
                <span>{mood.icon}</span>
                <span>{mood.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live AI Reasoning Commentary */}
        {selectedMood !== 'all' && (
          <div className="p-2 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8] text-[11px] text-[#4a3024] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ec4899] shrink-0" />
            <p className="font-medium">
              <strong className="text-[#be185d]">AI Sommelier Match:</strong> Filtering for cookies with matching dough and toppings.
            </p>
          </div>
        )}
      </section>

      {/* 3. Search & Category Filters */}
      <div className="space-y-2.5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#74513e]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="input-catalog-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cookies by flavor, chocolate, ube..."
            className="w-full h-11 pl-10 pr-9 rounded-full bg-white border border-[#fbcfe8] text-xs text-[#4a3024] placeholder:text-[#74513e]/60 focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#74513e] p-1 hover:text-[#523628] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-category-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`h-9 px-4 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 flex items-center justify-center cursor-pointer ${
                  isActive
                    ? 'bg-[#523628] text-[#fff5f7] shadow-xs'
                    : 'bg-white text-[#4a3024] border border-[#fbcfe8] hover:bg-[#fce7f3]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Section Title: SIGNATURE HOUSE COOKIES / Pick your happy / 08 COOKIES */}
      <div className="flex items-end justify-between pt-1">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#be185d]">
            SIGNATURE HOUSE COOKIES
          </p>
          <h2 className="text-2xl font-serif font-bold text-[#4a3024]">Pick your happy</h2>
        </div>
        <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-[#fce7f3] border border-[#fbcfe8] text-[#be185d] tracking-wider">
          {filteredProducts.length < 10 ? `0${filteredProducts.length}` : filteredProducts.length} COOKIES
        </span>
      </div>

      {/* 5. Cookie Products Stack */}
      <div className="space-y-4">
        {filteredProducts.map((product) => {
          const isJustAdded = addedEffectId === product.id;
          const isFavorited = !!favorites[product.id];
          const isSensoryExpanded = expandedSensoryId === product.id;

          return (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              onClick={() => setActiveModalProduct(product)}
              className="bg-white rounded-3xl border border-[#fbcfe8] overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
            >
              {/* Card Media Header */}
              <div className="relative h-44 sm:h-52 w-full bg-[#fce7f3] overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Top Badges Row */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                  {product.badge && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-white/95 text-[#be185d] border border-[#fbcfe8] shadow-xs">
                      {product.badge}
                    </span>
                  )}
                  {product.aiMatchScore && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#523628] text-[#fff5f7] flex items-center gap-1 shadow-xs">
                      <Sparkles className="w-2.5 h-2.5 text-[#f472b6]" />
                      <span>{product.aiMatchScore}% AI Match</span>
                    </span>
                  )}
                </div>

                {/* Heart Favorite Button */}
                <button
                  id={`btn-fav-${product.id}`}
                  onClick={(e) => toggleFavorite(product.id, e)}
                  aria-label="Toggle favorite"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#4a3024] shadow-xs hover:scale-110 active:scale-95 transition-all cursor-pointer border border-[#fbcfe8]"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isFavorited ? 'fill-[#ec4899] text-[#ec4899]' : 'text-[#74513e]'
                    }`}
                  />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2.5">
                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-serif font-bold text-[#4a3024]">
                      {product.name}
                    </h3>
                    <span className="text-[10px] text-[#74513e] font-medium">
                      ⭐ {product.rating} ({product.reviewsCount})
                    </span>
                  </div>

                  {product.flavorNotes && (
                    <p className="text-xs font-semibold text-[#be185d] mt-0.5">
                      {product.flavorNotes}
                    </p>
                  )}

                  <p className="text-xs text-[#74513e] leading-relaxed mt-1 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Creative AI Sensory Radar Trigger */}
                {product.aiTasteProfile && (
                  <div className="pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedSensoryId(isSensoryExpanded ? null : product.id);
                      }}
                      className="text-[11px] font-bold text-[#523628] hover:text-[#be185d] flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-[#ec4899]" />
                      <span>AI Sensory Tasting Matrix</span>
                      {isSensoryExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {isSensoryExpanded && (
                      <div className="mt-2 p-3 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8] space-y-2 text-[10px]">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-1.5 rounded-xl bg-white border border-[#fbcfe8]">
                            <span className="text-[#74513e] block font-medium">Sweetness</span>
                            <strong className="text-xs text-[#4a3024]">
                              {product.aiTasteProfile.sweetness} / 5
                            </strong>
                          </div>
                          <div className="p-1.5 rounded-xl bg-white border border-[#fbcfe8]">
                            <span className="text-[#74513e] block font-medium">Chewiness</span>
                            <strong className="text-xs text-[#4a3024]">
                              {product.aiTasteProfile.chewiness} / 5
                            </strong>
                          </div>
                          <div className="p-1.5 rounded-xl bg-white border border-[#fbcfe8]">
                            <span className="text-[#74513e] block font-medium">Richness</span>
                            <strong className="text-xs text-[#4a3024]">
                              {product.aiTasteProfile.richness} / 5
                            </strong>
                          </div>
                        </div>

                        <p className="text-[10px] text-[#74513e] leading-normal">
                          <strong className="text-[#be185d]">Sommelier Pairing:</strong>{' '}
                          {product.aiTasteProfile.pairing}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Row: Aligned Price and Add Button */}
                <div className="pt-2 border-t border-[#fbcfe8] flex items-center justify-between">
                  <div className="leading-tight">
                    <span className="text-[10px] text-[#74513e] block font-medium">Price</span>
                    <span className="text-lg font-serif font-extrabold text-[#4a3024]">
                      ₱{product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id={`btn-add-product-${product.id}`}
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`h-10 px-5 rounded-full font-bold text-xs transition-all duration-200 flex items-center gap-1.5 shadow-2xs active:scale-95 cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#fce7f3] text-[#523628] border border-[#fbcfe8] hover:bg-[#523628] hover:text-[#fff5f7] hover:scale-[1.02]'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to box</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div
          id="product-detail-modal-backdrop"
          onClick={() => setActiveModalProduct(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-xs animate-fadeIn"
        >
          <div
            id="product-detail-modal-sheet"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#fff5f7] text-[#4a3024] rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl space-y-4 max-h-[88vh] overflow-y-auto no-scrollbar border-t sm:border border-[#fbcfe8]"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-white text-[#be185d] border border-[#fbcfe8]">
                {activeModalProduct.badge || 'SIGNATURE COOKIE'}
              </span>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="w-8 h-8 rounded-full bg-white text-[#4a3024] flex items-center justify-center shadow-xs hover:bg-[#fce7f3] border border-[#fbcfe8] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Product Photo */}
            <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-[#fce7f3] shadow-inner">
              <img
                src={activeModalProduct.imageUrl}
                alt={activeModalProduct.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-sm font-serif font-extrabold bg-[#523628] text-[#fff5f7] shadow">
                ₱{activeModalProduct.price} PHP
              </span>
            </div>

            {/* Title & Flavor Notes */}
            <div>
              <h2 className="text-xl font-serif font-bold text-[#4a3024]">
                {activeModalProduct.name}
              </h2>
              {activeModalProduct.flavorNotes && (
                <p className="text-xs font-semibold text-[#be185d] mt-0.5">
                  {activeModalProduct.flavorNotes}
                </p>
              )}
              <p className="text-xs text-[#74513e] mt-1 leading-relaxed">
                {activeModalProduct.description}
              </p>
            </div>

            {/* Key Ingredients */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#74513e]">
                Key Artisan Ingredients
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeModalProduct.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white border border-[#fbcfe8] text-[#4a3024]"
                  >
                    {ing}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#74513e]">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>
                  <strong>Allergens:</strong> {activeModalProduct.allergens.join(', ')}
                </span>
              </div>
            </div>

            {/* Modal Action Buttons with aligned sizes */}
            <div className="pt-3 border-t border-[#fbcfe8] grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  if (onCustomizeInBuilder) {
                    onCustomizeInBuilder(activeModalProduct);
                  } else if (onOpenCustomBuilder) {
                    onOpenCustomBuilder();
                  }
                  setActiveModalProduct(null);
                }}
                className="h-11 px-4 rounded-full text-xs font-bold bg-[#fce7f3] text-[#523628] border border-[#fbcfe8] hover:bg-[#fbcfe8] transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ec4899]" />
                <span>Remix in Builder</span>
              </button>

              <button
                onClick={() => {
                  onAddToCart(activeModalProduct);
                  setActiveModalProduct(null);
                }}
                className="h-11 px-4 rounded-full text-xs font-bold bg-[#523628] text-[#fff5f7] hover:bg-[#684635] transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add ₱{activeModalProduct.price}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
