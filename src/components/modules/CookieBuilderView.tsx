/**
 * @file CookieBuilderView.tsx
 * @description Core Differentiator: Interactive 5-step custom cookie builder.
 * Features:
 * - Base dough selection
 * - Mix-ins multiselect (up to 4)
 * - Toppings and fillings selection
 * - Size & packaging selector
 * - Live dynamic cookie visualizer preview
 * - Auto-calculating price in Philippine Peso (₱)
 * - Real-time nutritional facts & allergen alerts
 * - "Surprise Me" randomizer button for indecisive users
 * - Name & Save custom creation to Community Gallery
 */

import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Dice5,
  ShoppingBag,
  Share2,
  Check,
  Plus,
  Flame,
  AlertTriangle,
  Package,
  Layers,
  Heart,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import {
  DoughOption,
  MixInOption,
  ToppingOption,
  CustomCookieBuild,
  CartItem,
} from '../../types';
import { DOUGH_OPTIONS, MIX_IN_OPTIONS, TOPPING_OPTIONS } from '../../data/mockData';
import { CookieVisualizer } from '../CookieVisualizer';

interface CookieBuilderViewProps {
  onAddToCart: (item: CartItem) => void;
  onSaveToCommunity?: (build: CustomCookieBuild) => void;
  onPublishToCommunity?: (build: CustomCookieBuild) => void;
  initialBuild?: CustomCookieBuild | null;
}

type BuilderStep = 'dough' | 'mixins' | 'toppings' | 'size' | 'packaging';

export const CookieBuilderView: React.FC<CookieBuilderViewProps> = ({
  onAddToCart,
  onSaveToCommunity,
  onPublishToCommunity,
  initialBuild,
}) => {
  const [activeStep, setActiveStep] = useState<BuilderStep>('dough');
  const [selectedDough, setSelectedDough] = useState<DoughOption>(
    initialBuild?.dough || DOUGH_OPTIONS[0]
  );
  const [selectedMixIns, setSelectedMixIns] = useState<MixInOption[]>(
    initialBuild?.mixIns || [MIX_IN_OPTIONS[0], MIX_IN_OPTIONS[4]]
  );
  const [selectedToppings, setSelectedToppings] = useState<ToppingOption[]>(
    initialBuild?.toppings || [TOPPING_OPTIONS[0]]
  );
  const [selectedSize, setSelectedSize] = useState<'regular' | 'chunky' | 'monster'>(
    initialBuild?.size || 'chunky'
  );
  const [selectedPackaging, setSelectedPackaging] = useState<
    'kraft-pouch' | 'box-classic' | 'tin-holographic'
  >(initialBuild?.packaging || 'box-classic');
  const [customName, setCustomName] = useState(
    initialBuild?.name || 'Kurookie Fluff Special'
  );
  const [authorName, setAuthorName] = useState('Jervin Paul R.');
  const [isSavedBanner, setIsSavedBanner] = useState(false);

  // Price calculations in Philippine Peso
  const sizeMultiplier = selectedSize === 'monster' ? 1.4 : selectedSize === 'chunky' ? 1.2 : 1.0;
  const packagingPrice =
    selectedPackaging === 'tin-holographic' ? 35 : selectedPackaging === 'box-classic' ? 15 : 0;

  const subtotalBase =
    selectedDough.price +
    selectedMixIns.reduce((acc, m) => acc + m.price, 0) +
    selectedToppings.reduce((acc, t) => acc + t.price, 0);

  const totalPrice = Math.round(subtotalBase * sizeMultiplier + packagingPrice);

  // Calories calculation
  const totalCalories = Math.round(
    (selectedDough.calories +
      selectedMixIns.reduce((acc, m) => acc + m.calories, 0) +
      selectedToppings.reduce((acc, t) => acc + t.calories, 0)) *
      sizeMultiplier
  );

  // Active allergen list
  const activeAllergens = useMemo(() => {
    const list = new Set<string>(['Gluten', 'Dairy']);
    selectedMixIns.forEach((m) => {
      if (m.allergen) list.add(m.allergen);
    });
    return Array.from(list);
  }, [selectedMixIns]);

  // Step Switcher
  const steps: { id: BuilderStep; label: string; number: string }[] = [
    { id: 'dough', label: '1. Dough', number: '1' },
    { id: 'mixins', label: '2. Mix-Ins', number: '2' },
    { id: 'toppings', label: '3. Toppings', number: '3' },
    { id: 'size', label: '4. Size', number: '4' },
    { id: 'packaging', label: '5. Box', number: '5' },
  ];

  // Toggle Mix-in selection (max 4)
  const toggleMixIn = (mix: MixInOption) => {
    if (selectedMixIns.some((m) => m.id === mix.id)) {
      setSelectedMixIns(selectedMixIns.filter((m) => m.id !== mix.id));
    } else {
      if (selectedMixIns.length >= 4) return;
      setSelectedMixIns([...selectedMixIns, mix]);
    }
  };

  // Toggle Topping selection
  const toggleTopping = (top: ToppingOption) => {
    if (selectedToppings.some((t) => t.id === top.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== top.id));
    } else {
      setSelectedToppings([...selectedToppings, top]);
    }
  };

  // "Surprise Me" Randomizer function
  const handleRandomize = () => {
    const randomDough = DOUGH_OPTIONS[Math.floor(Math.random() * DOUGH_OPTIONS.length)];
    const shuffledMix = [...MIX_IN_OPTIONS].sort(() => 0.5 - Math.random());
    const randomMixIns = shuffledMix.slice(0, Math.floor(Math.random() * 3) + 1);
    const shuffledTop = [...TOPPING_OPTIONS].sort(() => 0.5 - Math.random());
    const randomToppings = shuffledTop.slice(0, Math.floor(Math.random() * 2) + 1);

    const randomSizes: ('regular' | 'chunky' | 'monster')[] = ['regular', 'chunky', 'monster'];
    const randomSize = randomSizes[Math.floor(Math.random() * randomSizes.length)];

    const funNames = [
      'Midnight Volcano Dream',
      'Cashew Cloud Royale',
      'Strawberry Marshmallow Pop',
      'Dark Velvet Butterboni',
      'Matcha Heart Crunch',
      'Artisan Cookie Fluff Supreme',
      'Sweet Craving Wonder',
    ];

    setSelectedDough(randomDough);
    setSelectedMixIns(randomMixIns);
    setSelectedToppings(randomToppings);
    setSelectedSize(randomSize);
    setCustomName(funNames[Math.floor(Math.random() * funNames.length)]);

    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    } catch (_) {
      // fallback
    }
  };

  // Reset to default
  const handleReset = () => {
    setSelectedDough(DOUGH_OPTIONS[0]);
    setSelectedMixIns([MIX_IN_OPTIONS[0]]);
    setSelectedToppings([TOPPING_OPTIONS[0]]);
    setSelectedSize('regular');
    setCustomName('My Custom Cloud Fluff');
  };

  // Save to community
  const handleSaveToCommunity = () => {
    const build: CustomCookieBuild = {
      id: `custom-${Date.now()}`,
      name: customName.trim() || 'Custom Cookie',
      authorName: authorName.trim() || 'Fluff Explorer',
      dough: selectedDough,
      mixIns: selectedMixIns,
      toppings: selectedToppings,
      size: selectedSize,
      packaging: selectedPackaging,
      totalPrice,
      totalCalories,
      allergens: activeAllergens,
      likes: 1,
      createdAt: 'Just now',
      isOfficialCandidate: true,
    };
    const saveFn = onSaveToCommunity || onPublishToCommunity;
    saveFn?.(build);
    setIsSavedBanner(true);
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
    } catch (_) {}
    setTimeout(() => setIsSavedBanner(false), 4000);
  };

  // Add custom build to cart
  const handleAddToCart = () => {
    const build: CustomCookieBuild = {
      id: `custom-${Date.now()}`,
      name: customName.trim() || 'Custom Cookie',
      authorName,
      dough: selectedDough,
      mixIns: selectedMixIns,
      toppings: selectedToppings,
      size: selectedSize,
      packaging: selectedPackaging,
      totalPrice,
      totalCalories,
      allergens: activeAllergens,
      likes: 0,
      createdAt: 'Just now',
    };

    const cartItem: CartItem = {
      id: `cart-item-${Date.now()}`,
      type: 'custom',
      customBuild: build,
      title: customName,
      subtitle: `${selectedDough.name} + ${selectedMixIns.length} mix-ins (${selectedSize})`,
      unitPrice: totalPrice,
      quantity: 1,
    };

    onAddToCart(cartItem);
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } catch (_) {}
  };

  return (
    <div className="space-y-4 pb-14">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-extrabold text-[#4a3024] font-serif uppercase tracking-wide">
            Interactive Cookie Builder
          </h2>
          <p className="text-[11px] text-[#74513e]">
            Craft your signature cookie step-by-step
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="btn-builder-surprise-me"
            onClick={handleRandomize}
            className="h-9 px-3 rounded-full text-xs font-bold bg-[#fce7f3] text-[#523628] border border-[#fbcfe8] hover:bg-[#fbcfe8] transition flex items-center gap-1.5 active:scale-95 shadow-2xs cursor-pointer"
            title="Generate random cookie recipe"
          >
            <Dice5 className="w-3.5 h-3.5 text-[#ec4899]" />
            <span>Surprise Me</span>
          </button>

          <button
            onClick={handleReset}
            className="w-9 h-9 rounded-full bg-white border border-[#fbcfe8] text-[#523628] hover:bg-[#fff5f7] transition flex items-center justify-center cursor-pointer shadow-2xs"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Live Visualizer Stage */}
      <div className="p-4 rounded-3xl bg-gradient-to-b from-[#fff5f7] to-[#fce7f3] border border-[#fbcfe8] shadow-2xs flex flex-col items-center relative overflow-hidden">
        {/* Live Badge */}
        <div className="w-full flex items-center justify-between mb-2">
          <span className="flex items-center gap-1 text-[10px] font-bold text-[#523628] bg-white/90 px-2.5 py-0.5 rounded-full border border-[#fbcfe8]">
            <Layers className="w-3 h-3 text-[#ec4899]" /> Live Interactive Preview
          </span>
          <span className="text-[10px] font-bold text-[#be185d] bg-white/90 px-2.5 py-0.5 rounded-full border border-[#fbcfe8] flex items-center gap-1">
            <Flame className="w-3 h-3 text-[#ec4899]" /> {totalCalories} kcal
          </span>
        </div>

        {/* Visualizer SVG */}
        <CookieVisualizer
          dough={selectedDough}
          mixIns={selectedMixIns}
          toppings={selectedToppings}
          size={selectedSize}
          scale={1}
          className="my-1"
        />

        {/* Live Flavor Summary */}
        <div className="w-full mt-3 p-2.5 rounded-2xl bg-white/95 border border-[#fbcfe8] text-center space-y-0.5 shadow-2xs">
          <p className="text-xs font-bold text-[#4a3024] truncate">
            {selectedDough.name}
            {selectedMixIns.length > 0
              ? ` with ${selectedMixIns.map((m) => m.name.split(' ')[0]).join(', ')}`
              : ''}
          </p>
          <div className="flex items-center justify-center gap-2 text-[10px] text-[#74513e]">
            <span>Size: <strong>{selectedSize}</strong></span>
            <span>•</span>
            <span>Pack: <strong>{selectedPackaging}</strong></span>
            <span>•</span>
            <span className="text-[#4a3024] font-extrabold">₱{totalPrice} PHP</span>
          </div>
        </div>
      </div>

      {/* Step Tabs Navigation */}
      <div className="grid grid-cols-5 gap-1 p-1 bg-white rounded-2xl border border-[#fbcfe8] shadow-2xs">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              id={`tab-builder-step-${step.id}`}
              onClick={() => setActiveStep(step.id)}
              className={`py-2 px-1 rounded-xl text-[10px] font-bold transition-all text-center leading-tight cursor-pointer ${
                isActive
                  ? 'bg-[#523628] text-[#fff5f7] shadow-xs'
                  : 'text-[#74513e] hover:bg-[#fff5f7]'
              }`}
            >
              {step.label}
            </button>
          );
        })}
      </div>

      {/* Step 1: Base Dough */}
      {activeStep === 'dough' && (
        <div className="space-y-2.5 animate-fadeIn">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-[#4a3024]">Select Cookie Base Dough</span>
            <span className="text-[11px] text-[#74513e]">Includes base bake (₱85 - ₱105)</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {DOUGH_OPTIONS.map((dough) => {
              const isSelected = selectedDough.id === dough.id;
              return (
                <div
                  key={dough.id}
                  id={`select-dough-${dough.id}`}
                  onClick={() => setSelectedDough(dough)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#fff5f7] border-[#ec4899] ring-2 ring-[#ec4899]/20 shadow-xs'
                      : 'bg-white border-[#fbcfe8] hover:bg-[#fff5f7]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl shadow-inner border border-black/10 flex items-center justify-center text-white"
                      style={{ backgroundColor: dough.color }}
                    >
                      {isSelected && <Check className="w-5 h-5 text-white drop-shadow" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#4a3024]">{dough.name}</h4>
                      <p className="text-[10px] text-[#74513e] line-clamp-1">
                        {dough.texture}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-extrabold text-[#4a3024]">₱{dough.price}</span>
                    <p className="text-[9px] text-[#74513e]">{dough.calories} kcal</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Mix-Ins */}
      {activeStep === 'mixins' && (
        <div className="space-y-2.5 animate-fadeIn">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-[#4a3024]">
              Select Mix-Ins ({selectedMixIns.length}/4 chosen)
            </span>
            <span className="text-[11px] text-[#74513e]">+₱20 - ₱30 each</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {MIX_IN_OPTIONS.map((mix) => {
              const isSelected = selectedMixIns.some((m) => m.id === mix.id);
              return (
                <div
                  key={mix.id}
                  id={`select-mixin-${mix.id}`}
                  onClick={() => toggleMixIn(mix)}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#fff5f7] border-[#ec4899] ring-2 ring-[#ec4899]/20 shadow-xs'
                      : 'bg-white border-[#fbcfe8] hover:bg-[#fff5f7]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="w-4 h-4 rounded-full border border-black/15 flex-shrink-0"
                      style={{ backgroundColor: mix.color }}
                    />
                    <span className="text-[11px] font-extrabold text-[#4a3024]">
                      +₱{mix.price}
                    </span>
                  </div>

                  <div className="mt-2">
                    <p className="text-xs font-bold text-[#4a3024] leading-tight">{mix.name}</p>
                    <div className="flex items-center justify-between mt-1 text-[9px] text-[#74513e]">
                      <span>{mix.calories} kcal</span>
                      {mix.allergen && (
                        <span className="text-amber-800 font-semibold">{mix.allergen}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Toppings */}
      {activeStep === 'toppings' && (
        <div className="space-y-2.5 animate-fadeIn">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-[#4a3024]">Gourmet Toppings & Finishes</span>
            <span className="text-[11px] text-[#74513e]">Signature decorations</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {TOPPING_OPTIONS.map((top) => {
              const isSelected = selectedToppings.some((t) => t.id === top.id);
              return (
                <div
                  key={top.id}
                  id={`select-topping-${top.id}`}
                  onClick={() => toggleTopping(top)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#fff5f7] border-[#ec4899] ring-2 ring-[#ec4899]/20 shadow-xs'
                      : 'bg-white border-[#fbcfe8] hover:bg-[#fff5f7]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isSelected
                          ? 'bg-[#523628] text-[#fff5f7]'
                          : 'bg-[#fce7f3] text-[#523628]'
                      }`}
                    >
                      {isSelected ? '✓' : '+'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#4a3024]">{top.name}</h4>
                      <p className="text-[10px] text-[#74513e]">
                        {top.id === 'top-heart-frosting'
                          ? 'Official logo signature heart decoration'
                          : top.id === 'top-bitten-edge'
                          ? 'Signature bite aesthetic from logo design'
                          : `${top.calories} kcal add-on`}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-[#4a3024]">
                    {top.price === 0 ? 'Free' : `+₱${top.price}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 4: Size Selection */}
      {activeStep === 'size' && (
        <div className="space-y-2.5 animate-fadeIn">
          <div className="text-xs font-bold text-[#4a3024] px-1">
            Choose Cookie Weight & Grammage
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'regular', name: 'Regular', weight: '80 grams', mult: '1.0x', priceNote: 'Base' },
              { id: 'chunky', name: 'Chunky Giant', weight: '110 grams', mult: '1.2x', priceNote: '+20%' },
              { id: 'monster', name: 'Monster Fluff', weight: '150 grams', mult: '1.4x', priceNote: '+40%' },
            ].map((sizeItem) => {
              const isSelected = selectedSize === sizeItem.id;
              return (
                <button
                  key={sizeItem.id}
                  id={`select-size-${sizeItem.id}`}
                  onClick={() => setSelectedSize(sizeItem.id as any)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#523628] text-[#fff5f7] border-[#523628] shadow-xs'
                      : 'bg-white text-[#4a3024] border-[#fbcfe8] hover:bg-[#fff5f7]'
                  }`}
                >
                  <p className="text-xs font-extrabold">{sizeItem.name}</p>
                  <p className="text-[10px] opacity-80 mt-0.5">{sizeItem.weight}</p>
                  <span
                    className={`inline-block mt-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#fce7f3] text-[#be185d]'
                    }`}
                  >
                    {sizeItem.priceNote}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 5: Packaging & Naming */}
      {activeStep === 'packaging' && (
        <div className="space-y-3 animate-fadeIn">
          <div className="text-xs font-bold text-[#4a3024] px-1">
            Packaging Box & Custom Branding
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'kraft-pouch', name: 'Kraft Pouch', price: 0, desc: 'Eco Brown Bag' },
              { id: 'box-classic', name: 'Bakery Gift Box', price: 15, desc: 'Pastel Fluff Box' },
              { id: 'tin-holographic', name: 'Limited Tin Can', price: 35, desc: 'Collector Keep' },
            ].map((box) => {
              const isSelected = selectedPackaging === box.id;
              return (
                <button
                  key={box.id}
                  id={`select-packaging-${box.id}`}
                  onClick={() => setSelectedPackaging(box.id as any)}
                  className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#523628] text-[#fff5f7] border-[#523628] shadow-xs'
                      : 'bg-white text-[#4a3024] border-[#fbcfe8] hover:bg-[#fff5f7]'
                  }`}
                >
                  <Package className="w-4 h-4 mx-auto mb-1 opacity-80" />
                  <p className="text-[11px] font-bold leading-tight">{box.name}</p>
                  <p className="text-[9px] opacity-70 mt-0.5">
                    {box.price === 0 ? 'Free' : `+₱${box.price}`}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Name Your Creation */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#fbcfe8] space-y-2 shadow-2xs">
            <label className="block text-xs font-bold text-[#4a3024]">
              Name Your Cookie Creation (e.g., "Kurookie by Caelivar")
            </label>
            <input
              type="text"
              id="input-custom-cookie-name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Kurookie by Caelivar"
              className="w-full h-10 px-3 rounded-full bg-[#fff5f7] border border-[#fbcfe8] text-xs font-bold text-[#4a3024] focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
            />
            <div className="flex items-center justify-between text-[10px] text-[#74513e]">
              <span>Baker handle: <strong>{authorName}</strong></span>
              <span className="text-[#be185d] font-semibold">Eligible for Community Spotlight</span>
            </div>
          </div>
        </div>
      )}

      {/* Allergens Notification */}
      <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-[10px]">
        <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-700" />
        <span>
          <strong>Live Allergens:</strong> {activeAllergens.join(', ')} (Handcrafted in a facility handling dairy & eggs).
        </span>
      </div>

      {/* Success Notification Banner */}
      {isSavedBanner && (
        <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>
              Published <strong>"{customName}"</strong> to Community Gallery!
            </span>
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Bar with aligned buttons */}
      <div className="pt-3 border-t border-[#fbcfe8] grid grid-cols-2 gap-2.5">
        <button
          id="btn-save-to-community"
          onClick={handleSaveToCommunity}
          className="h-11 px-4 rounded-full text-xs font-bold bg-[#fce7f3] text-[#523628] border border-[#fbcfe8] hover:bg-[#fbcfe8] transition flex items-center justify-center gap-1.5 active:scale-95 shadow-2xs cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5 text-[#ec4899]" />
          <span>Save to Community</span>
        </button>

        <button
          id="btn-add-custom-to-cart"
          onClick={handleAddToCart}
          className="h-11 px-4 rounded-full text-xs font-bold bg-[#523628] text-[#fff5f7] hover:bg-[#684635] transition flex items-center justify-center gap-1.5 active:scale-95 shadow-xs cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Box (₱{totalPrice})</span>
        </button>
      </div>
    </div>
  );
};
