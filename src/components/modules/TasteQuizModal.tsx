/**
 * @file TasteQuizModal.tsx
 * @description Taste Preference Quiz Modal (From Onboarding & Authentication specifications)
 * Collects sweet tooth level, allergies, and favorite mix-ins to power personalized recommendations.
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  SlidersHorizontal,
  Heart,
  Sparkles,
  Check,
  ShieldAlert,
} from 'lucide-react';
import { TasteProfile } from '../../types';

interface TasteQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: TasteProfile;
  onSaveProfile: (profile: TasteProfile) => void;
}

export const TasteQuizModal: React.FC<TasteQuizModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
}) => {
  const [sweetLevel, setSweetLevel] = useState(currentProfile.sweetToothLevel);
  const [selectedMixIns, setSelectedMixIns] = useState<string[]>(currentProfile.favoriteMixIns);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(currentProfile.allergies);

  if (!isOpen) return null;

  const mixInOptions = [
    'Belgian Dark Chunks',
    'Swiss White Drops',
    'Roasted Kasoy (Cashew)',
    'Toasted Walnuts',
    'Marshmallow Fluff',
    'Manila Chocnut',
    'Dried Baguio Cranberries',
    'Dulce De Leche Drops',
  ];

  const allergyOptions = ['Peanuts', 'Tree Nuts', 'Dairy', 'Gluten', 'Eggs'];

  const toggleMix = (item: string) => {
    if (selectedMixIns.includes(item)) {
      setSelectedMixIns(selectedMixIns.filter((x) => x !== item));
    } else {
      setSelectedMixIns([...selectedMixIns, item]);
    }
  };

  const toggleAllergy = (item: string) => {
    if (selectedAllergies.includes(item)) {
      setSelectedAllergies(selectedAllergies.filter((x) => x !== item));
    } else {
      setSelectedAllergies([...selectedAllergies, item]);
    }
  };

  const handleSave = () => {
    onSaveProfile({
      ...currentProfile,
      sweetToothLevel: sweetLevel,
      favoriteMixIns: selectedMixIns,
      allergies: selectedAllergies,
    });
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    } catch (_) {}
    onClose();
  };

  return (
    <div
      id="taste-quiz-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 backdrop-blur-xs animate-fadeIn"
    >
      <div
        id="taste-quiz-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white text-[#4a3024] rounded-3xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto no-scrollbar border border-[#fbcfe8]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#fce7f3] text-[#523628]">
              <SlidersHorizontal className="w-4 h-4 text-[#ec4899]" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4a3024]">
                Taste Preference Quiz
              </h3>
              <p className="text-[10px] text-[#74513e]">Feeds into your flavor profile</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#fff5f7] text-[#74513e] hover:bg-[#fce7f3] flex items-center justify-center cursor-pointer transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Question 1: Sweet tooth level */}
        <div className="space-y-1.5 p-3.5 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8]">
          <div className="flex justify-between text-xs font-bold text-[#4a3024]">
            <span>1. Sweet Tooth Intensity</span>
            <span className="text-[#be185d]">
              {sweetLevel === 1
                ? 'Dark & Bitter (Level 1)'
                : sweetLevel === 2
                ? 'Subtle Sweet (Level 2)'
                : sweetLevel === 3
                ? 'Balanced Classic (Level 3)'
                : sweetLevel === 4
                ? 'Very Sweet (Level 4)'
                : 'Maximum Sugar Rush (Level 5)'}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            value={sweetLevel}
            onChange={(e) => setSweetLevel(Number(e.target.value))}
            className="w-full accent-[#ec4899] cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-[#74513e]">
            <span>Low Sugar</span>
            <span>Balanced</span>
            <span>Sweet Tooth</span>
          </div>
        </div>

        {/* Question 2: Favorite Mix-Ins */}
        <div className="space-y-1.5 p-3.5 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8]">
          <span className="text-xs font-bold text-[#4a3024] block">
            2. Favorite Mix-Ins & Texture
          </span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {mixInOptions.map((item) => {
              const isSelected = selectedMixIns.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => toggleMix(item)}
                  className={`h-8 px-3 rounded-full text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? 'bg-[#ec4899] text-white shadow-2xs'
                      : 'bg-white text-[#4a3024] border border-[#fbcfe8] hover:bg-[#fce7f3]'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 3: Allergies Exclusions */}
        <div className="space-y-1.5 p-3.5 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#4a3024]">
            <ShieldAlert className="w-3.5 h-3.5 text-[#ec4899]" />
            <span>3. Dietary & Allergen Exclusions</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {allergyOptions.map((item) => {
              const isSelected = selectedAllergies.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => toggleAllergy(item)}
                  className={`h-8 px-3 rounded-full text-[10px] font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#be185d] text-white shadow-2xs'
                      : 'bg-white text-[#4a3024] border border-[#fbcfe8] hover:bg-[#fce7f3]'
                  }`}
                >
                  {isSelected ? `No ${item} (Excluded)` : item}
                </button>
              );
            })}
          </div>
        </div>

        <button
          id="btn-save-taste-quiz"
          onClick={handleSave}
          className="w-full h-11 px-4 rounded-full text-xs font-bold bg-[#523628] text-[#fff5f7] hover:bg-[#684635] transition shadow-xs cursor-pointer active:scale-95"
        >
          Save Flavor Profile
        </button>
      </div>
    </div>
  );
};
