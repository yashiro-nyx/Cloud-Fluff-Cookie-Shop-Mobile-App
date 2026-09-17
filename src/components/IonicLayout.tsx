/**
 * @file IonicLayout.tsx
 * @description Master Mobile Shell & Ionic Framework Scaffold
 * Implements:
 * - ion-header & ion-toolbar with ion-menu-button
 * - ion-content scroll container
 * - Bottom quick tab bar
 * - Device viewport switch (Mobile Phone Mockup vs Responsive Full Screen)
 * - Platform switch (iOS vs Android / Material Design)
 */

import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonBadge,
} from '@ionic/react';
import {
  Menu,
  ShoppingBag,
  Smartphone,
  Maximize2,
  Video,
  Sparkles,
  Cookie,
  LayoutDashboard,
  Award,
  Users2,
  Wifi,
  Battery,
  Signal,
  ArrowLeft,
  Search,
  LogIn,
  LogOut,
} from 'lucide-react';
import { PageId } from '../types';
import { CookieLogo } from './CookieLogo';

interface IonicLayoutProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onToggleMenu: () => void;
  cartCount: number;
  onOpenRecordingGuide?: () => void;
  sideMenu?: React.ReactNode;
  isLoggedIn?: boolean;
  currentUser?: { name: string; email: string; tier: string; initials: string } | null;
  onOpenAuthModal?: () => void;
  onLogout?: () => void;
  children: React.ReactNode;
}

export const IonicLayout: React.FC<IonicLayoutProps> = ({
  activePage,
  onNavigate,
  onToggleMenu,
  cartCount,
  sideMenu,
  isLoggedIn,
  currentUser,
  onOpenAuthModal,
  onLogout,
  children,
}) => {
  const [isDeviceFrame, setIsDeviceFrame] = useState(true);
  const [platformMode, setPlatformMode] = useState<'ios' | 'md'>('ios');

  // Title generator based on active page
  const getPageHeader = () => {
    switch (activePage) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Cookie Fluffs Artisan Bakery' };
      case 'products':
        return { title: 'List of Products', subtitle: 'Handcrafted Cookie Lineup' };
      case 'cookie-builder':
        return { title: 'Cookie Builder', subtitle: 'Custom Cookie Studio' };
      case 'community':
        return { title: 'Community Gallery', subtitle: 'Trending Customer Bakes' };
      case 'cart':
        return { title: 'Cart & Box Review', subtitle: 'Checkout & Order Bundles' };
      case 'orders':
        return { title: 'Order Tracking', subtitle: 'Oven-to-Door Progress' };
      case 'loyalty':
        return { title: 'Rewards & Crumbs', subtitle: 'Fluff Points & Perks' };
      case 'favorites':
        return { title: 'My Favorites', subtitle: 'Saved Cookie Bakes' };
      case 'profile':
        return { title: 'My Account', subtitle: 'Personal Details & Tiers' };
      case 'settings':
        return { title: 'Settings', subtitle: 'Addresses, Payments & Alerts' };
      case 'help':
        return { title: 'Help & Support', subtitle: 'Bakery FAQ & Assistance' };
      case 'about':
        return { title: 'About Cookie Fluffs', subtitle: 'Our Story & Craft' };
      case 'developers':
        return { title: 'Developer Credits', subtitle: 'Development Team' };
      default:
        return { title: 'Cookie Fluffs', subtitle: 'Artisan Cookie Shop' };
    }
  };

  const headerInfo = getPageHeader();

  return (
    <div className="min-h-screen w-full bg-[#fae8eb] text-[#4a3024] flex flex-col items-center justify-start sm:py-6 sm:px-4 select-none">
      {/* External Top Control Bar (Desktop controls) */}
      <header className="w-full max-w-xl mb-3 px-3 hidden sm:flex items-center justify-between text-xs text-[#74513e] font-medium">
        <div className="flex items-center gap-2">
          <CookieLogo size={24} />
          <span className="font-extrabold text-[#523628] tracking-wide">
            COOKIE FLUFFS
          </span>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#fce7f3] border border-[#fbcfe8] text-[#be185d] font-bold">
            Artisan Cookie Shop
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Platform Switcher */}
          <button
            onClick={() => setPlatformMode(platformMode === 'ios' ? 'md' : 'ios')}
            className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-[#523628] text-[11px] font-bold transition flex items-center gap-1.5 border border-[#fbcfe8] cursor-pointer shadow-2xs active:scale-95"
            title="Switch between iOS and Material Design styling"
          >
            <span>{platformMode === 'ios' ? ' iOS Mode' : '🤖 Android Mode'}</span>
          </button>

          {/* Viewport Frame Toggle */}
          <button
            onClick={() => setIsDeviceFrame(!isDeviceFrame)}
            className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-[#523628] border border-[#fbcfe8] transition cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1.5 text-[11px] font-bold"
            title={isDeviceFrame ? 'Switch to Full Screen View' : 'Switch to Phone Chassis'}
          >
            {isDeviceFrame ? (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Expand View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>Phone Chassis</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Mobile Chassis / Canvas */}
      <IonPage
        id="main-content"
        className={`w-full relative transition-all duration-300 flex flex-col bg-[#fff5f7] overflow-hidden ${
          isDeviceFrame
            ? 'h-[100dvh] sm:h-[844px] sm:max-h-[92vh] sm:max-w-[410px] sm:rounded-[48px] sm:border-[10px] sm:border-[#3e2418] sm:phone-shadow sm:my-auto'
            : 'min-h-[100dvh] sm:max-w-2xl sm:min-h-[85vh] sm:rounded-3xl sm:border sm:border-[#fbcfe8] sm:shadow-lg sm:my-auto'
        }`}
      >
        {/* Ionic Side Menu Drawer rendered at top-level chassis */}
        {sideMenu}

        {/* Ionic Header: Contains phone status bar & clean streamlined toolbar */}
        <IonHeader className="z-30 flex-shrink-0 border-b border-[#fce7f3] bg-[#fff5f7]/95 backdrop-blur-md shadow-2xs">
          {/* Phone Status Bar (Rendered only on Desktop Chassis Mode) */}
          {isDeviceFrame && (
            <div
              className={`hidden sm:flex h-9 bg-transparent text-[#4a3024] px-6 items-center justify-between text-[11px] font-bold select-none border-b border-[#fce7f3]/60 ${
                platformMode === 'ios' ? 'pt-1' : ''
              }`}
            >
              <span>9:41</span>

              {/* Dynamic Island Pill (iOS mode) */}
              {platformMode === 'ios' && (
                <div className="w-20 h-3.5 bg-[#523628]/15 rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899]/60" />
                </div>
              )}

              <div className="flex items-center gap-1.5 opacity-80 text-[#74513e]">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>
          )}

          <IonToolbar
            id="ion-header-toolbar"
            className="h-14 bg-transparent text-[#4a3024] [--background:transparent] [--border-color:transparent] [--color:#4a3024] [--padding-start:0] [--padding-end:0]"
          >
            {/* Structured Flex Row: mathematically immune to overlapping */}
            <div className="flex items-center justify-between w-full h-full px-3">
              {/* Left: Menu Button */}
              <button
                id="ion-menu-button"
                onClick={onToggleMenu}
                className="w-10 h-10 rounded-2xl text-[#4a3024] hover:bg-[#fce7f3] active:scale-95 transition flex items-center justify-center focus:outline-none cursor-pointer shrink-0 border border-transparent hover:border-[#fbcfe8]"
                aria-label="Open Side Menu"
              >
                <Menu className="w-5 h-5 text-[#523628]" />
              </button>

              {/* Center: Simplified, elegant brand / section header */}
              <div className="flex-1 min-w-0 px-2 text-center">
                {activePage === 'dashboard' ? (
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-base font-bold tracking-tight text-[#4a3024] font-serif">
                      Cookie Fluffs
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#ec4899]" />
                  </div>
                ) : (
                  <>
                    <h1 className="text-sm font-bold tracking-tight text-[#4a3024] font-serif truncate">
                      {headerInfo.title}
                    </h1>
                    <p className="text-[10px] text-[#be185d] font-sans font-semibold truncate -mt-0.5">
                      {headerInfo.subtitle}
                    </p>
                  </>
                )}
              </div>

              {/* Right: Streamlined Actions with Cart & Auth */}
              <div className="flex items-center gap-1 shrink-0">
                {/* Shopping Cart Button */}
                <button
                  id="ion-cart-button"
                  onClick={() => onNavigate('cart')}
                  className="w-9 h-9 rounded-xl text-[#523628] hover:bg-[#fce7f3] active:scale-95 transition relative flex items-center justify-center cursor-pointer border border-transparent hover:border-[#fbcfe8]"
                  aria-label="Open Cookie Box"
                  title="Shopping Cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span
                      id="cart-badge-counter"
                      className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#ec4899] text-white text-[9px] font-black flex items-center justify-center shadow-xs ring-1 ring-white"
                    >
                      {cartCount}
                    </span>
                  )}
                </button>

                {/* Login / Logout Controls */}
                {isLoggedIn ? (
                  <div className="flex items-center gap-1">
                    <button
                      id="btn-navbar-profile"
                      onClick={() => onNavigate('profile')}
                      className="w-8 h-8 rounded-full bg-[#fce7f3] border border-[#fbcfe8] text-[#523628] text-xs font-bold flex items-center justify-center hover:bg-[#fbcfe8] active:scale-95 transition cursor-pointer shadow-2xs"
                      title={`Signed in as ${currentUser?.name || 'User'}`}
                      aria-label="My Account"
                    >
                      {currentUser?.initials || 'JP'}
                    </button>
                    <button
                      id="btn-navbar-logout"
                      onClick={onLogout}
                      className="w-8 h-8 rounded-full text-[#74513e] hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition cursor-pointer"
                      title="Log Out"
                      aria-label="Log Out"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    id="btn-navbar-login"
                    onClick={onOpenAuthModal}
                    className="h-8 px-2.5 rounded-full bg-[#523628] text-[#fff5f7] hover:bg-[#684635] text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs active:scale-95"
                    title="Log In"
                  >
                    <LogIn className="w-3 h-3 text-[#fbcfe8]" />
                    <span className="text-[11px]">Log In</span>
                  </button>
                )}
              </div>
            </div>
          </IonToolbar>
        </IonHeader>

        {/* Ionic Scroll Content (ion-content) with pink-dominant clean background */}
        <IonContent
          id="ion-content-scroll"
          className="flex-1 no-scrollbar relative [--background:#fff5f7] [--color:#4a3024]"
        >
          <div className="p-4 sm:p-5">
            {children}
          </div>
        </IonContent>

        {/* Ionic Bottom Navigation Bar (ion-tab-bar) */}
        <nav
          id="ion-bottom-tab-bar"
          className="h-16 bg-white/95 border-t border-[#fce7f3] px-2 flex items-center justify-around z-30 flex-shrink-0 backdrop-blur-md shadow-xs"
        >
          {[
            { id: 'dashboard' as PageId, label: 'Home', icon: LayoutDashboard },
            { id: 'products' as PageId, label: 'Cookies', icon: Cookie },
            { id: 'cookie-builder' as PageId, label: 'Builder', icon: Sparkles, highlight: true },
            { id: 'community' as PageId, label: 'Gallery', icon: Users2 },
            { id: 'cart' as PageId, label: 'Cart', icon: ShoppingBag, badge: cartCount },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activePage === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-nav-${tab.id}`}
                onClick={() => onNavigate(tab.id)}
                className={`relative flex flex-col items-center justify-center flex-1 max-w-[68px] h-13 py-1 rounded-2xl transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#523628] font-bold'
                    : 'text-[#74513e]/70 hover:text-[#523628] hover:bg-[#fff5f7]/60'
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl relative transition-all ${
                    tab.highlight && isActive
                      ? 'bg-[#523628] text-[#fff5f7] shadow-xs scale-105'
                      : tab.highlight
                      ? 'bg-[#fce7f3] text-[#be185d] border border-[#fbcfe8]'
                      : isActive
                      ? 'bg-[#fce7f3] text-[#523628]'
                      : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.badge && tab.badge > 0 ? (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#ec4899] text-white text-[8px] font-bold flex items-center justify-center ring-1 ring-white">
                      {tab.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] mt-1 tracking-tight leading-none font-semibold">
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1 w-3.5 h-0.5 rounded-full bg-[#be185d]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Emulated Home Bar Indicator (iOS) */}
        {platformMode === 'ios' && isDeviceFrame && (
          <div className="hidden sm:flex h-3.5 bg-white/95 items-center justify-center flex-shrink-0">
            <div className="w-28 h-1 bg-[#523628]/20 rounded-full" />
          </div>
        )}
      </IonPage>
    </div>
  );
};
