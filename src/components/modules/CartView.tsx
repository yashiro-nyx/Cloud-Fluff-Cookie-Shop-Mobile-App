/**
 * @file CartView.tsx
 * @description Cart & Cookie Box Ordering Module strictly for cookies
 * Features:
 * - Cookie quantity management
 * - Cookie Box / Bundle builder (Single Pouch, 4-Box, 6-Box, 12-Box Party)
 * - Pickup vs. Delivery toggle + time-slot scheduling
 * - Order notes for baker
 * - Promo code discounts (e.g. FLUFFY10, SWEETCOOKIE)
 * - Payment options: GCash, Maya, Card, Cash on Delivery (COD)
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  Clock,
  MapPin,
  Wallet,
  Package,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { CartItem, OrderRecord } from '../../types';

interface CartViewProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onPlaceOrder: (order: OrderRecord) => void;
  onExploreProducts: () => void;
}

export const CartView: React.FC<CartViewProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onExploreProducts,
}) => {
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedBoxBundle, setSelectedBoxBundle] = useState<'individual' | '4-box' | '6-box' | '12-box'>('6-box');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number; freeDelivery?: boolean } | null>({
    code: 'FLUFFY10',
    discountPercent: 10,
  });
  const [promoError, setPromoError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'GCash' | 'Maya' | 'Card' | 'COD'>('GCash');
  const [deliveryAddress, setDeliveryAddress] = useState(
    'Unit 402 Aurora Tower, Araneta City, Cubao, Quezon City'
  );
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('ASAP (Fresh from Oven ~25 mins)');
  const [orderNotes, setOrderNotes] = useState('Please pack with extra napkins and seal warm.');

  // Calculations
  const rawSubtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // Bundle discount
  const bundleDiscount =
    selectedBoxBundle === '12-box' && items.length >= 2 ? 80 :
    selectedBoxBundle === '6-box' && items.length >= 2 ? 40 :
    selectedBoxBundle === '4-box' && items.length >= 2 ? 20 : 0;

  const promoDiscount = appliedPromo
    ? Math.round(((rawSubtotal - bundleDiscount) * appliedPromo.discountPercent) / 100)
    : 0;

  const totalDiscount = bundleDiscount + promoDiscount;
  const baseDeliveryFee = fulfillmentType === 'delivery' ? (appliedPromo?.freeDelivery ? 0 : 49) : 0;
  const grandTotal = Math.max(0, rawSubtotal - totalDiscount + baseDeliveryFee);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === 'FLUFFY10') {
      setAppliedPromo({ code: 'FLUFFY10', discountPercent: 10 });
      setPromoError('');
    } else if (code === 'SWEETCOOKIE') {
      setAppliedPromo({ code: 'SWEETCOOKIE', discountPercent: 15, freeDelivery: true });
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "FLUFFY10" or "SWEETCOOKIE"');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;

    const newOrder: OrderRecord = {
      orderId: `CF-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
      status: 'received',
      estimatedMinutes: fulfillmentType === 'delivery' ? 25 : 15,
      items: [...items],
      subtotal: rawSubtotal,
      discount: totalDiscount,
      deliveryFee: baseDeliveryFee,
      total: grandTotal,
      paymentMethod,
      fulfillmentType,
      address: fulfillmentType === 'delivery' ? deliveryAddress : 'Store Pickup: Cookie Fluffs Flagship Boutique, Cubao',
      notes: orderNotes,
    };

    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    } catch (_) {}

    onPlaceOrder(newOrder);
  };

  if (items.length === 0) {
    return (
      <div className="py-12 px-4 text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-[#fce7f3] border border-[#fbcfe8] mx-auto flex items-center justify-center text-[#523628] shadow-2xs">
          <ShoppingBag className="w-10 h-10 text-[#ec4899]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#4a3024] font-serif">Your Cookie Box is Empty</h3>
          <p className="text-xs text-[#74513e] mt-1 max-w-xs mx-auto">
            Choose fresh cookies from our signature catalog or craft your own in the interactive Cookie Builder!
          </p>
        </div>
        <button
          onClick={onExploreProducts}
          className="h-11 px-6 rounded-full text-xs font-bold bg-[#523628] text-[#fff5f7] hover:bg-[#684635] transition shadow-xs active:scale-95 cursor-pointer"
        >
          Explore Cookie Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-extrabold text-[#4a3024] uppercase tracking-wide font-serif">
            Your Cookie Box & Cart
          </h2>
          <p className="text-[11px] text-[#74513e]">
            {items.length} {items.length === 1 ? 'cookie type' : 'cookie types'} selected
          </p>
        </div>

        <button
          onClick={onExploreProducts}
          className="text-xs font-bold text-[#be185d] hover:underline cursor-pointer"
        >
          + Add More Cookies
        </button>
      </div>

      {/* Box / Bundle Builder Packaging */}
      <div className="p-3.5 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#4a3024]">
          <Package className="w-4 h-4 text-[#ec4899]" />
          <span>Cookie Box & Packaging Option</span>
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {[
            { id: 'individual', label: 'Single Pouch', perk: 'Standard' },
            { id: '4-box', label: 'Box of 4', perk: '-₱20 Off' },
            { id: '6-box', label: 'Box of 6', perk: '-₱40 Off' },
            { id: '12-box', label: 'Party 12', perk: '-₱80 Off' },
          ].map((bundle) => {
            const isSelected = selectedBoxBundle === bundle.id;
            return (
              <button
                key={bundle.id}
                onClick={() => setSelectedBoxBundle(bundle.id as any)}
                className={`p-2 rounded-2xl text-center border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#523628] text-[#fff5f7] border-[#523628] shadow-xs'
                    : 'bg-[#fff5f7] text-[#4a3024] border-[#fbcfe8] hover:bg-[#fce7f3]'
                }`}
              >
                <p className="text-[10px] font-bold leading-tight">{bundle.label}</p>
                <span
                  className={`inline-block text-[8px] font-extrabold mt-0.5 px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#fce7f3] text-[#be185d]'
                  }`}
                >
                  {bundle.perk}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cart Items List */}
      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            id={`cart-item-row-${item.id}`}
            className="p-3 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-12 h-12 rounded-2xl object-cover border border-[#fbcfe8]"
                />
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-[#fce7f3] border border-[#fbcfe8] flex items-center justify-center text-[#523628]">
                  <Sparkles className="w-5 h-5 text-[#ec4899]" />
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold text-[#4a3024] leading-snug">{item.title}</h4>
                <p className="text-[10px] text-[#74513e] line-clamp-1">{item.subtitle}</p>
                <span className="text-xs font-extrabold text-[#4a3024] mt-0.5 block">
                  ₱{item.unitPrice * item.quantity} PHP
                </span>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#fff5f7] border border-[#fbcfe8] rounded-full p-1 shadow-2xs">
                <button
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#523628] hover:bg-white transition cursor-pointer"
                  title="Decrease"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center text-xs font-bold text-[#4a3024]">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#523628] hover:bg-white transition cursor-pointer"
                  title="Increase"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={() => onRemoveItem(item.id)}
                className="p-1.5 text-[#74513e]/60 hover:text-rose-600 transition cursor-pointer"
                title="Remove cookie"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fulfillment Toggle: Delivery vs Pickup */}
      <div className="p-3.5 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs space-y-3">
        <div className="grid grid-cols-2 gap-2 p-1 bg-[#fff5f7] rounded-full border border-[#fbcfe8]">
          <button
            id="toggle-delivery"
            onClick={() => setFulfillmentType('delivery')}
            className={`h-9 text-xs font-bold rounded-full transition-all cursor-pointer ${
              fulfillmentType === 'delivery'
                ? 'bg-[#523628] text-[#fff5f7] shadow-xs'
                : 'text-[#4a3024] hover:bg-white/50'
            }`}
          >
            🛵 Express Delivery
          </button>
          <button
            id="toggle-pickup"
            onClick={() => setFulfillmentType('pickup')}
            className={`h-9 text-xs font-bold rounded-full transition-all cursor-pointer ${
              fulfillmentType === 'pickup'
                ? 'bg-[#523628] text-[#fff5f7] shadow-xs'
                : 'text-[#4a3024] hover:bg-white/50'
            }`}
          >
            🏬 Store Pickup
          </button>
        </div>

        {fulfillmentType === 'delivery' ? (
          <div className="space-y-2">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#74513e] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#ec4899]" /> Delivery Address
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full mt-1 h-10 px-3 rounded-full bg-[#fff5f7] border border-[#fbcfe8] text-xs text-[#4a3024] font-medium focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#74513e] flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#ec4899]" /> Time-Slot Scheduling
              </label>
              <select
                value={deliveryTimeSlot}
                onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                className="w-full mt-1 h-10 px-3 rounded-full bg-[#fff5f7] border border-[#fbcfe8] text-xs text-[#4a3024] font-medium focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
              >
                <option>ASAP (Fresh from Oven ~25 mins)</option>
                <option>Today: 3:30 PM - 4:00 PM (Afternoon Tea Break)</option>
                <option>Today: 5:00 PM - 5:30 PM</option>
                <option>Tomorrow Morning: 10:00 AM (Warm Morning Batch)</option>
              </select>
            </div>
          </div>
        ) : (
          <div className="p-2.5 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8] text-xs text-[#4a3024] space-y-1">
            <p className="font-bold">📍 Store Pickup Point:</p>
            <p className="text-[11px] text-[#74513e]">
              Cookie Fluffs Flagship Boutique, Aurora Blvd, Cubao, Quezon City
            </p>
            <p className="text-[10px] text-emerald-800 font-semibold">Ready in 15 minutes</p>
          </div>
        )}

        {/* Order Notes */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#74513e]">
            Special Baking Instructions / Notes
          </label>
          <input
            type="text"
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            placeholder="e.g. Extra napkins, please keep warm"
            className="w-full mt-1 h-10 px-3 rounded-full bg-[#fff5f7] border border-[#fbcfe8] text-xs text-[#4a3024] focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
          />
        </div>
      </div>

      {/* Promo Code Input */}
      <div className="p-3.5 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-[#74513e] flex items-center gap-1">
          <Tag className="w-3 h-3 text-[#ec4899]" /> Promo Code & Discounts
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            placeholder="Try FLUFFY10 or SWEETCOOKIE"
            className="flex-1 h-10 px-3 rounded-full bg-[#fff5f7] border border-[#fbcfe8] text-xs uppercase font-bold text-[#4a3024] placeholder:normal-case placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
          />
          <button
            onClick={handleApplyPromo}
            className="h-10 px-4 rounded-full text-xs font-bold bg-[#523628] text-[#fff5f7] hover:bg-[#684635] transition shadow-xs cursor-pointer"
          >
            Apply
          </button>
        </div>

        {appliedPromo && (
          <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            <span>
              Promo <strong>"{appliedPromo.code}"</strong> applied!
            </span>
            <span className="font-bold">
              {appliedPromo.discountPercent}% Off {appliedPromo.freeDelivery ? '+ Free Delivery' : ''}
            </span>
          </div>
        )}

        {promoError && (
          <p className="text-[10px] text-rose-700 font-semibold px-2">{promoError}</p>
        )}
      </div>

      {/* Payment Method Selector (Philippine Gateways) */}
      <div className="p-3.5 rounded-3xl bg-white border border-[#fbcfe8] shadow-2xs space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-[#74513e] flex items-center gap-1">
          <Wallet className="w-3 h-3 text-[#ec4899]" /> Payment Gateway
        </label>

        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'GCash', label: 'GCash', desc: 'Scan to Pay / Mobile' },
            { id: 'Maya', label: 'Maya', desc: 'Maya Wallet' },
            { id: 'Card', label: 'Credit/Debit Card', desc: 'Visa / Mastercard' },
            { id: 'COD', label: 'Cash on Delivery', desc: 'Pay upon receipt' },
          ].map((method) => {
            const isSelected = paymentMethod === method.id;
            return (
              <button
                key={method.id}
                id={`payment-${method.id}`}
                onClick={() => setPaymentMethod(method.id as any)}
                className={`p-2.5 rounded-2xl border text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#523628] text-[#fff5f7] border-[#523628] shadow-xs'
                    : 'bg-[#fff5f7] text-[#4a3024] border-[#fbcfe8] hover:bg-[#fce7f3]'
                }`}
              >
                <p className="text-xs font-extrabold">{method.label}</p>
                <p className={`text-[9px] ${isSelected ? 'text-[#fff5f7]/80' : 'text-[#74513e]'}`}>
                  {method.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Order Cost Breakdown */}
      <div className="p-3.5 rounded-3xl bg-[#fff5f7] border border-[#fbcfe8] space-y-2 text-xs text-[#4a3024] shadow-2xs">
        <div className="flex justify-between">
          <span className="text-[#74513e]">Cookies Subtotal</span>
          <span className="font-bold">₱{rawSubtotal}</span>
        </div>

        {bundleDiscount > 0 && (
          <div className="flex justify-between text-emerald-800">
            <span>Cookie Box Bundle Savings ({selectedBoxBundle})</span>
            <span className="font-bold">-₱{bundleDiscount}</span>
          </div>
        )}

        {promoDiscount > 0 && (
          <div className="flex justify-between text-emerald-800">
            <span>Promo Code Discount ({appliedPromo?.code})</span>
            <span className="font-bold">-₱{promoDiscount}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-[#74513e]">
            {fulfillmentType === 'delivery' ? 'Delivery Fee' : 'Store Pickup Fee'}
          </span>
          <span className="font-bold">
            {baseDeliveryFee === 0 ? 'FREE' : `₱${baseDeliveryFee}`}
          </span>
        </div>

        <div className="pt-2 border-t border-[#fbcfe8] flex justify-between items-center text-sm font-extrabold text-[#4a3024]">
          <span>Grand Total (PHP)</span>
          <span className="text-base font-serif font-extrabold text-[#4a3024]">₱{grandTotal}</span>
        </div>
      </div>

      {/* Place Order CTA Button with aligned sizing */}
      <button
        id="btn-place-order"
        onClick={handleCheckout}
        className="w-full h-12 px-5 rounded-full text-sm font-extrabold bg-[#523628] text-[#fff5f7] hover:bg-[#684635] active:scale-[0.98] transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
      >
        <span>Place Order (₱{grandTotal} with {paymentMethod})</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
