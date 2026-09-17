/**
 * @file IonicSideMenu.tsx
 * @description Production-grade user ecommerce side menu navigation drawer
 * matching the pink-dominant palette and user-facing architecture.
 */

import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
} from '@ionic/react';
import {
  LayoutDashboard,
  Cookie,
  Sparkles,
  ShoppingBag,
  Users2,
  Truck,
  Award,
  Info,
  Code2,
  X,
  ChevronRight,
  SlidersHorizontal,
  User,
  Settings,
  Heart,
  HelpCircle,
  LogIn,
  LogOut,
} from 'lucide-react';
import { PageId } from '../types';
import { CookieLogo } from './CookieLogo';

interface IonicSideMenuProps {
  isOpen: boolean;
  activePage: PageId;
  onSelectPage?: (page: PageId) => void;
  onNavigate?: (page: PageId) => void;
  onClose: () => void;
  cartCount: number;
  activeOrderCount?: number;
  fluffPoints?: number;
  onOpenTasteQuiz?: () => void;
  onOpenRecordingGuide?: () => void;
  isLoggedIn?: boolean;
  currentUser?: { name: string; email: string; tier: string; initials: string } | null;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
}

interface MenuItemConfig {
  id: PageId;
  label: string;
  sublabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
}

export const IonicSideMenu: React.FC<IonicSideMenuProps> = ({
  isOpen,
  activePage,
  onSelectPage,
  onNavigate,
  onClose,
  cartCount,
  activeOrderCount = 0,
  fluffPoints = 420,
  onOpenTasteQuiz,
  isLoggedIn,
  currentUser,
  onLoginClick,
  onLogoutClick,
}) => {
  const handleSelect = (page: PageId) => {
    if (onSelectPage) {
      onSelectPage(page);
    } else if (onNavigate) {
      onNavigate(page);
    }
  };

  const storeNav: MenuItemConfig[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      sublabel: 'Fresh daily bakes & oven status',
      icon: LayoutDashboard,
    },
    {
      id: 'products',
      label: 'Cookie Menu',
      sublabel: 'Signature house recipes & AI pairings',
      icon: Cookie,
      badge: '8 Cookies',
      badgeColor: 'bg-[#fce7f3] text-[#523628] border border-[#fbcfe8]',
    },
    {
      id: 'cookie-builder',
      label: 'Custom Cookie Studio',
      sublabel: 'Dough, mix-ins, fillings & toppings',
      icon: Sparkles,
      badge: 'Interactive',
      badgeColor: 'bg-[#fce7f3] text-[#be185d] border border-[#fbcfe8]',
    },
    {
      id: 'favorites',
      label: 'Saved Favorites',
      sublabel: 'Your curated cookie wishlist',
      icon: Heart,
    },
    {
      id: 'cart',
      label: 'Cart & Cookie Box',
      sublabel: 'Custom packaging & quick checkout',
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : undefined,
      badgeColor: 'bg-[#ec4899] text-white',
    },
  ];

  const ordersAndRewardsNav: MenuItemConfig[] = [
    {
      id: 'orders',
      label: 'Order Tracking',
      sublabel: 'Live oven-to-door progress & receipts',
      icon: Truck,
      badge: activeOrderCount > 0 ? 'Active' : undefined,
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'loyalty',
      label: 'Rewards & Crumbs',
      sublabel: `${fluffPoints} Fluff crumbs balance`,
      icon: Award,
      badge: `${fluffPoints} pts`,
      badgeColor: 'bg-[#fce7f3] text-[#523628] border border-[#fbcfe8]',
    },
    {
      id: 'community',
      label: 'Community Gallery',
      sublabel: 'Customer cookie recipes & remix',
      icon: Users2,
      badge: 'Trending',
      badgeColor: 'bg-[#fce7f3] text-[#523628] border border-[#fbcfe8]',
    },
  ];

  const accountAndSettingsNav: MenuItemConfig[] = [
    {
      id: 'profile',
      label: 'My Account',
      sublabel: 'Profile, tier, & cookie preferences',
      icon: User,
    },
    {
      id: 'settings',
      label: 'Settings',
      sublabel: 'Addresses, payment methods & alerts',
      icon: Settings,
    },
    {
      id: 'help',
      label: 'Help & FAQ',
      sublabel: 'Cookie baking, shipping & support',
      icon: HelpCircle,
    },
    {
      id: 'about',
      label: 'About Cookie Fluffs',
      sublabel: 'Our artisan cookie craft story',
      icon: Info,
    },
    {
      id: 'developers',
      label: 'Developer Credits',
      sublabel: 'Engineering & design contributors',
      icon: Code2,
    },
  ];

  const renderNavSection = (title: string, items: MenuItemConfig[]) => (
    <div className="space-y-1">
      <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#74513e]/70 flex items-center justify-between">
        <span>{title}</span>
      </div>
      <IonList className="space-y-1 bg-transparent p-0 m-0">
        {items.map((item) => {
          const IconComponent = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              id={`menu-nav-${item.id}`}
              onClick={() => handleSelect(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-left transition-all duration-150 group cursor-pointer ${
                isActive
                  ? 'bg-[#523628] text-[#fff5f7] shadow-xs font-semibold'
                  : 'text-[#4a3024] hover:bg-[#fce7f3] hover:translate-x-0.5'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                    isActive
                      ? 'bg-white/15 text-[#fff5f7]'
                      : 'bg-[#fce7f3] text-[#523628] group-hover:bg-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold truncate leading-tight">
                      {item.label}
                    </span>
                  </div>
                  {item.sublabel && (
                    <span
                      className={`text-[10px] block truncate mt-0.5 ${
                        isActive ? 'text-[#fff5f7]/70' : 'text-[#74513e]'
                      }`}
                    >
                      {item.sublabel}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {item.badge !== undefined && (
                  <IonBadge
                    className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                      item.badgeColor || 'bg-[#fce7f3] text-[#4a3024]'
                    }`}
                  >
                    {item.badge}
                  </IonBadge>
                )}
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isActive
                      ? 'text-[#fff5f7]/60 translate-x-0.5'
                      : 'text-[#74513e]/40 group-hover:translate-x-0.5'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </IonList>
    </div>
  );

  return (
    <div
      id="ionic-side-menu-container"
      className={`fixed sm:absolute inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
      }`}
    >
      {/* Backdrop for Ionic Drawer */}
      <div
        id="side-menu-backdrop"
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 backdrop-blur-[2px] ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Slide-over Ionic Menu Panel */}
      <aside
        id="ionic-side-menu-drawer"
        className={`absolute top-0 left-0 bottom-0 w-[84%] max-w-[320px] bg-[#fff5f7] text-[#4a3024] shadow-2xl flex flex-col transition-transform duration-300 ease-out border-r border-[#fbcfe8] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* ion-header: Brand Header */}
        <div className="p-4 pt-6 pb-4 relative border-b border-[#fbcfe8] bg-white/70">
          {/* Close button */}
          <button
            id="btn-close-side-menu"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#74513e] hover:text-[#523628] hover:bg-[#fce7f3] transition cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#fce7f3] p-1.5 flex items-center justify-center shadow-2xs border border-[#fbcfe8]">
              <CookieLogo size={32} />
            </div>
            <div>
              <h2 className="font-bold text-base tracking-tight font-serif text-[#4a3024]">
                Cookie Fluffs
              </h2>
              <p className="text-[10px] text-[#be185d] font-semibold tracking-wide">
                Artisan Cookie Shop
              </p>
            </div>
          </div>
        </div>

        {/* ion-content: Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-3 px-2 space-y-4">
          {renderNavSection('STORE & BAKERY', storeNav)}
          {renderNavSection('MY ORDERS & REWARDS', ordersAndRewardsNav)}
          {renderNavSection('MY ACCOUNT & PREFERENCES', accountAndSettingsNav)}

          {/* Quick Helper Tool */}
          <div className="pt-2 border-t border-[#fbcfe8] px-1">
            <button
              id="btn-trigger-taste-quiz"
              onClick={() => {
                onClose();
                onOpenTasteQuiz?.();
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-2xl bg-[#fce7f3] text-[#4a3024] hover:bg-[#fbcfe8] border border-[#fbcfe8] transition cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#ec4899]" />
                <span>Taste Profile Quiz</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#be185d] font-bold shadow-2xs">
                Retake
              </span>
            </button>
          </div>
        </div>

        {/* ion-footer: User Profile Card & Auth Actions */}
        <div className="p-3 bg-white/95 border-t border-[#fbcfe8] flex items-center justify-between gap-2 shrink-0">
          {isLoggedIn ? (
            <>
              <button
                id="btn-side-menu-user-profile"
                onClick={() => handleSelect('profile')}
                className="flex items-center gap-2.5 flex-1 min-w-0 text-left hover:opacity-80 transition cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-[#fce7f3] border border-[#fbcfe8] text-[#523628] font-bold text-xs flex items-center justify-center shrink-0">
                  {currentUser?.initials || 'JP'}
                </div>
                <div className="leading-tight min-w-0">
                  <p className="text-xs font-bold text-[#4a3024] truncate flex items-center gap-1">
                    <span>{currentUser?.name || 'Jervin Paul R.'}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#ec4899] text-white font-extrabold shrink-0">
                      {currentUser?.tier || 'VIP'}
                    </span>
                  </p>
                  <p className="text-[10px] text-[#74513e] truncate">{fluffPoints} Fluff Points</p>
                </div>
              </button>

              <button
                id="btn-side-menu-logout"
                onClick={() => {
                  onClose();
                  onLogoutClick?.();
                }}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition cursor-pointer shrink-0"
                title="Log Out"
                aria-label="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-between gap-2">
              <div className="leading-tight min-w-0">
                <p className="text-xs font-bold text-[#4a3024]">Guest Baker</p>
                <p className="text-[10px] text-[#74513e]">Sign in for rewards</p>
              </div>
              <button
                id="btn-side-menu-login"
                onClick={() => {
                  onClose();
                  onLoginClick?.();
                }}
                className="py-1.5 px-3 rounded-full bg-[#523628] text-white hover:bg-[#684635] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <LogIn className="w-3.5 h-3.5 text-[#fbcfe8]" />
                <span>Log In</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
