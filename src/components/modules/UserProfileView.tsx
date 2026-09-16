/**
 * @file UserProfileView.tsx
 * @description Comprehensive ecommerce user account, profile, and settings management view.
 * Features personal details, saved delivery addresses, payment methods, dietary preferences,
 * and notification settings with the soft pink palette.
 */

import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CreditCard,
  Bell,
  ShieldCheck,
  Check,
  Plus,
  Trash2,
  Edit2,
  Award,
  Sparkles,
  Heart,
  Package,
  LogOut,
  ChevronRight,
  Save,
  AlertCircle,
} from 'lucide-react';
import { UserAccountProfile, UserAddress, SavedPaymentMethod, PageId } from '../../types';

interface UserProfileViewProps {
  onNavigate: (page: PageId) => void;
  fluffPoints: number;
  onShowToast: (msg: string) => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  onNavigate,
  fluffPoints,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<
    'profile' | 'addresses' | 'payments' | 'dietary' | 'notifications'
  >('profile');

  // Profile Form State
  const [profile, setProfile] = useState<UserAccountProfile>({
    name: 'Jervin Paul Romualdo',
    email: 'Jervinpaulromualdo@gmail.com',
    phone: '+63 917 842 1983',
    membershipTier: 'Gold Fluff Master',
    birthday: '2002-11-18',
    fluffPoints: fluffPoints,
    addresses: [
      {
        id: 'addr-1',
        label: 'Home',
        recipientName: 'Jervin Paul Romualdo',
        phone: '+63 917 842 1983',
        street: 'Unit 4B, Katipunan Residences, Aurora Blvd',
        city: 'Quezon City, Metro Manila',
        notes: 'Ring doorbell twice or leave with lobby guard',
        isDefault: true,
      },
      {
        id: 'addr-2',
        label: 'Campus / Office',
        recipientName: 'Jervin Paul Romualdo',
        phone: '+63 917 842 1983',
        street: 'College of Computer Studies, 20th Ave',
        city: 'Cubao, Quezon City',
        notes: 'Deliver to 3rd Floor Student Lounge',
        isDefault: false,
      },
    ],
    paymentMethods: [
      {
        id: 'pay-1',
        type: 'GCash',
        accountTitle: 'GCash e-Wallet',
        accountNumberMasked: '0917 •••• 983',
        isDefault: true,
      },
      {
        id: 'pay-2',
        type: 'Card',
        accountTitle: 'BDO Visa Debit',
        accountNumberMasked: '•••• •••• •••• 4129',
        isDefault: false,
      },
      {
        id: 'pay-3',
        type: 'COD',
        accountTitle: 'Cash on Delivery',
        accountNumberMasked: 'Exact amount preferred',
        isDefault: false,
      },
    ],
    dietaryRestrictions: ['Nut-Conscious'],
    notificationsEnabled: true,
    orderUpdatesEmail: true,
    marketingSms: false,
  });

  // Modal for new address
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    recipientName: profile.name,
    phone: profile.phone,
    street: '',
    city: 'Quezon City, Metro Manila',
    notes: '',
  });

  // Dietary options
  const dietaryOptions = [
    { id: 'Nut-Free', label: 'Nut-Free', desc: 'Alert if recipe contains pecans or cashews' },
    { id: 'Gluten-Sensitive', label: 'Gluten-Sensitive', desc: 'Prefer gluten-safe oats and flour' },
    { id: 'Dairy-Free', label: 'Dairy-Free', desc: 'Vegetable oil & plant-milk cookies' },
    { id: 'Low-Sugar', label: 'Low-Sugar', desc: 'Highlight dark chocolate & less sweet bakes' },
    { id: 'Vegan', label: '100% Plant-Based', desc: 'No animal products or butter' },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Account details updated successfully!');
  };

  const handleSetDefaultAddress = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    }));
    onShowToast('Default delivery address updated!');
  };

  const handleDeleteAddress = (id: string) => {
    if (profile.addresses.length <= 1) {
      onShowToast('You must keep at least one saved address.');
      return;
    }
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id),
    }));
    onShowToast('Address removed.');
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.street.trim()) {
      onShowToast('Please enter a street address.');
      return;
    }
    const created: UserAddress = {
      id: `addr-${Date.now()}`,
      label: newAddress.label,
      recipientName: newAddress.recipientName,
      phone: newAddress.phone,
      street: newAddress.street,
      city: newAddress.city,
      notes: newAddress.notes,
      isDefault: profile.addresses.length === 0,
    };
    setProfile((prev) => ({
      ...prev,
      addresses: [...prev.addresses, created],
    }));
    setIsAddingAddress(false);
    setNewAddress({
      label: 'Home',
      recipientName: profile.name,
      phone: profile.phone,
      street: '',
      city: 'Quezon City, Metro Manila',
      notes: '',
    });
    onShowToast('New delivery address added!');
  };

  const handleToggleDietary = (item: string) => {
    setProfile((prev) => {
      const exists = prev.dietaryRestrictions.includes(item);
      const updated = exists
        ? prev.dietaryRestrictions.filter((d) => d !== item)
        : [...prev.dietaryRestrictions, item];
      return { ...prev, dietaryRestrictions: updated };
    });
    onShowToast('Dietary preferences updated!');
  };

  return (
    <div className="space-y-4 pb-12">
      {/* 1. Profile Header Hero Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-[#fff5f7] via-[#fce7f3] to-[#fff5f7] border border-[#fbcfe8] shadow-2xs space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-16 h-16 rounded-3xl bg-[#523628] text-white flex items-center justify-center font-serif text-xl font-bold border-2 border-[#fbcfe8] shadow-xs">
                JR
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#ec4899] text-white flex items-center justify-center shadow-xs text-[10px]">
                <Sparkles className="w-3 h-3" />
              </span>
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-serif font-bold text-[#4a3024]">
                  {profile.name}
                </h2>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#523628] text-white font-extrabold tracking-wide">
                  GOLD VIP
                </span>
              </div>
              <p className="text-xs text-[#74513e]">{profile.email}</p>
              <p className="text-[11px] text-[#74513e]/80">{profile.phone}</p>
            </div>
          </div>
        </div>

        {/* Quick Stat Indicators */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#fbcfe8]/70">
          <div
            onClick={() => onNavigate('loyalty')}
            className="p-2 rounded-2xl bg-white/90 border border-[#fbcfe8] text-center cursor-pointer hover:bg-white transition"
          >
            <span className="text-[10px] text-[#74513e] block font-medium">Fluff Points</span>
            <strong className="text-sm font-serif font-extrabold text-[#be185d]">
              {fluffPoints} pts
            </strong>
          </div>

          <div
            onClick={() => onNavigate('orders')}
            className="p-2 rounded-2xl bg-white/90 border border-[#fbcfe8] text-center cursor-pointer hover:bg-white transition"
          >
            <span className="text-[10px] text-[#74513e] block font-medium">Past Orders</span>
            <strong className="text-sm font-serif font-extrabold text-[#4a3024]">
              12 Boxes
            </strong>
          </div>

          <div
            onClick={() => onNavigate('favorites')}
            className="p-2 rounded-2xl bg-white/90 border border-[#fbcfe8] text-center cursor-pointer hover:bg-white transition"
          >
            <span className="text-[10px] text-[#74513e] block font-medium">Wishlist</span>
            <strong className="text-sm font-serif font-extrabold text-[#ec4899]">
              4 Saved
            </strong>
          </div>
        </div>
      </div>

      {/* 2. Account Tabs Segment */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
        {[
          { id: 'profile', label: 'Details', icon: User },
          { id: 'addresses', label: 'Addresses', icon: MapPin },
          { id: 'payments', label: 'Payments', icon: CreditCard },
          { id: 'dietary', label: 'Dietary', icon: ShieldCheck },
          { id: 'notifications', label: 'Alerts', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-profile-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`h-9 px-3.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#523628] text-[#fff5f7] shadow-xs scale-[1.02]'
                  : 'bg-white text-[#4a3024] border border-[#fbcfe8] hover:bg-[#fff5f7]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}

      {/* TAB: Personal Details */}
      {activeTab === 'profile' && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white rounded-3xl border border-[#fbcfe8] p-4 shadow-2xs space-y-3.5"
        >
          <div className="flex items-center justify-between pb-2 border-b border-[#fbcfe8]">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#4a3024]">
              Personal Information
            </h3>
            <span className="text-[10px] text-[#be185d] font-bold">Verified Account</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-[#74513e] block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#74513e]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full h-10 pl-10 pr-3 rounded-full bg-[#fff5f7] border border-[#fbcfe8] text-xs text-[#4a3024] font-semibold focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#74513e] block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#74513e]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full h-10 pl-10 pr-3 rounded-full bg-[#fff5f7] border border-[#fbcfe8] text-xs text-[#4a3024] font-semibold focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#74513e] block mb-1">
                Contact Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#74513e]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full h-10 pl-10 pr-3 rounded-full bg-[#fff5f7] border border-[#fbcfe8] text-xs text-[#4a3024] font-semibold focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#74513e] block mb-1">
                Birthday (For Annual Free Cookie Box Gift 🎁)
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#74513e]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={profile.birthday}
                  onChange={(e) => setProfile({ ...profile, birthday: e.target.value })}
                  className="w-full h-10 pl-10 pr-3 rounded-full bg-[#fff5f7] border border-[#fbcfe8] text-xs text-[#4a3024] font-semibold focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 rounded-full bg-[#523628] text-[#fff5f7] font-bold text-xs hover:bg-[#684635] active:scale-98 transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Account Information</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB: Delivery Addresses */}
      {activeTab === 'addresses' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#4a3024]">
              Saved Delivery Addresses
            </h3>
            <button
              id="btn-add-new-address"
              onClick={() => setIsAddingAddress(true)}
              className="h-9 px-3.5 rounded-full bg-[#fce7f3] text-[#523628] border border-[#fbcfe8] text-xs font-bold hover:bg-[#fbcfe8] flex items-center gap-1 cursor-pointer transition shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#ec4899]" />
              <span>Add New</span>
            </button>
          </div>

          {/* List of Saved Addresses */}
          <div className="space-y-2.5">
            {profile.addresses.map((addr) => (
              <div
                key={addr.id}
                className={`p-3.5 rounded-3xl bg-white border transition-all ${
                  addr.isDefault
                    ? 'border-[#ec4899] ring-2 ring-[#ec4899]/20 shadow-xs'
                    : 'border-[#fbcfe8]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#fce7f3] text-[#523628]">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-600 text-white flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Default
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    {!addr.isDefault && (
                      <button
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="text-[10px] font-bold text-[#be185d] hover:underline px-1 cursor-pointer"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteAddress(addr.id)}
                      className="p-1 text-[#74513e]/60 hover:text-red-600 transition cursor-pointer"
                      title="Delete address"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-2 space-y-0.5 text-xs text-[#4a3024]">
                  <p className="font-bold">{addr.recipientName}</p>
                  <p className="text-[#74513e]">{addr.street}</p>
                  <p className="text-[#74513e]/80 text-[11px]">{addr.city}</p>
                  <p className="text-[#74513e]/80 text-[11px]">📞 {addr.phone}</p>
                  {addr.notes && (
                    <p className="text-[10px] text-[#be185d] italic pt-1">
                      Note: {addr.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Address Form Modal / Inline */}
          {isAddingAddress && (
            <form
              onSubmit={handleAddNewAddress}
              className="p-4 rounded-3xl bg-[#fff5f7] border border-[#fbcfe8] space-y-3 animate-fadeIn"
            >
              <div className="flex items-center justify-between pb-1 border-b border-[#fbcfe8]">
                <h4 className="text-xs font-bold text-[#4a3024] uppercase tracking-wider">
                  New Delivery Location
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(false)}
                  className="text-xs text-[#74513e] font-bold hover:text-[#4a3024] cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-[#74513e] block mb-1">
                    Label (e.g. Home, Dorm)
                  </label>
                  <input
                    type="text"
                    value={newAddress.label}
                    onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                    className="w-full h-10 px-3 rounded-full bg-white border border-[#fbcfe8] text-xs focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#74513e] block mb-1">
                    Recipient Phone
                  </label>
                  <input
                    type="tel"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                    className="w-full h-10 px-3 rounded-full bg-white border border-[#fbcfe8] text-xs focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#74513e] block mb-1">
                  Street, Bldg / Apt Name & Unit #
                </label>
                <input
                  type="text"
                  placeholder="e.g. 142 Aurora Blvd, Tower B #1202"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="w-full h-10 px-3 rounded-full bg-white border border-[#fbcfe8] text-xs focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#74513e] block mb-1">
                  City / Area
                </label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  className="w-full h-10 px-3 rounded-full bg-white border border-[#fbcfe8] text-xs focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#74513e] block mb-1">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leave at guardhouse or call upon arrival"
                  value={newAddress.notes}
                  onChange={(e) => setNewAddress({ ...newAddress, notes: e.target.value })}
                  className="w-full h-10 px-3 rounded-full bg-white border border-[#fbcfe8] text-xs focus:outline-none focus:ring-2 focus:ring-[#ec4899]/30"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-full bg-[#523628] text-white text-xs font-bold hover:bg-[#684635] transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Address</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* TAB: Payment Methods */}
      {activeTab === 'payments' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#4a3024]">
              Saved Payment Options
            </h3>
            <span className="text-[10px] text-[#74513e] font-semibold">
              Encrypted & Safe
            </span>
          </div>

          <div className="space-y-2.5">
            {profile.paymentMethods.map((pm) => (
              <div
                key={pm.id}
                className="p-3.5 rounded-3xl bg-white border border-[#fbcfe8] flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#fce7f3] border border-[#fbcfe8] flex items-center justify-center text-[#523628]">
                    <CreditCard className="w-5 h-5 text-[#ec4899]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-[#4a3024]">{pm.accountTitle}</h4>
                      {pm.isDefault && (
                        <span className="text-[9px] px-2 py-0.2 rounded-full bg-emerald-600 text-white font-extrabold">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#74513e] font-mono mt-0.5">
                      {pm.accountNumberMasked}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-[#be185d] bg-[#fce7f3] px-2.5 py-1 rounded-full border border-[#fbcfe8]">
                    {pm.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice */}
          <div className="p-3 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8] text-[11px] text-[#74513e] flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              We support instant checkout with <strong>GCash</strong>, <strong>Maya</strong>, Visa,
              Mastercard, and Cash on Delivery with zero transaction fees.
            </p>
          </div>
        </div>
      )}

      {/* TAB: Dietary & Allergens */}
      {activeTab === 'dietary' && (
        <div className="bg-white rounded-3xl border border-[#fbcfe8] p-4 shadow-2xs space-y-3.5">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#4a3024]">
              Dietary & Allergen Preferences
            </h3>
            <p className="text-[11px] text-[#74513e] mt-0.5">
              The AI Flavor Co-Pilot and cookie cards will automatically highlight warnings or
              safe options based on your selections.
            </p>
          </div>

          <div className="space-y-2">
            {dietaryOptions.map((opt) => {
              const isSelected = profile.dietaryRestrictions.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => handleToggleDietary(opt.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#fce7f3] border-[#ec4899]'
                      : 'bg-[#fff5f7] border-[#fbcfe8] hover:bg-[#fce7f3]/50'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-[#4a3024] block">
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-[#74513e] block">{opt.desc}</span>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#ec4899] border-[#ec4899] text-white'
                        : 'border-[#fbcfe8] bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-3xl border border-[#fbcfe8] p-4 shadow-2xs space-y-3.5">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#4a3024]">
            Notification Settings
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8]">
              <div>
                <p className="text-xs font-bold text-[#4a3024]">Oven & Delivery Updates</p>
                <p className="text-[10px] text-[#74513e]">Live status when your cookies bake</p>
              </div>
              <input
                type="checkbox"
                checked={profile.notificationsEnabled}
                onChange={(e) => {
                  setProfile({ ...profile, notificationsEnabled: e.target.checked });
                  onShowToast('Alert settings saved');
                }}
                className="w-4 h-4 accent-[#ec4899] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8]">
              <div>
                <p className="text-xs font-bold text-[#4a3024]">Email Invoices & Receipts</p>
                <p className="text-[10px] text-[#74513e]">Send PDF breakdown after each cookie order</p>
              </div>
              <input
                type="checkbox"
                checked={profile.orderUpdatesEmail}
                onChange={(e) => {
                  setProfile({ ...profile, orderUpdatesEmail: e.target.checked });
                  onShowToast('Receipt preferences saved');
                }}
                className="w-4 h-4 accent-[#ec4899] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#fff5f7] border border-[#fbcfe8]">
              <div>
                <p className="text-xs font-bold text-[#4a3024]">Fresh Batch SMS Alerts</p>
                <p className="text-[10px] text-[#74513e]">Notify when seasonal cookies drop</p>
              </div>
              <input
                type="checkbox"
                checked={profile.marketingSms}
                onChange={(e) => {
                  setProfile({ ...profile, marketingSms: e.target.checked });
                  onShowToast('SMS preferences saved');
                }}
                className="w-4 h-4 accent-[#ec4899] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Quick Account Actions Footer */}
      <div className="pt-2 space-y-2">
        <button
          onClick={() => onNavigate('orders')}
          className="w-full h-11 px-4 rounded-full bg-[#fce7f3] text-[#523628] border border-[#fbcfe8] text-xs font-bold hover:bg-[#fbcfe8] transition flex items-center justify-between cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-[#ec4899]" />
            <span>View All Past Cookie Orders & Tracking</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#74513e]/60" />
        </button>

        <button
          onClick={() => onNavigate('help')}
          className="w-full h-11 px-4 rounded-full bg-white text-[#523628] border border-[#fbcfe8] text-xs font-bold hover:bg-[#fff5f7] transition flex items-center justify-between cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#ec4899]" />
            <span>Help Center & FAQ</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#74513e]/60" />
        </button>
      </div>
    </div>
  );
};
