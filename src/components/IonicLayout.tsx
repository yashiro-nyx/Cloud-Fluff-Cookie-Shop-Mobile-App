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
} from 'lucide-react';
import { PageId } from '../types';
import { CookieLogo } from './CookieLogo';

interface IonicLayoutProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onToggleMenu: () => void;
  cartCount: number;
  onOpenRecordingGuide?: () => void;
  children: React.ReactNode;
}

export const IonicLayout: React.FC<IonicLayoutProps> = ({
  activePage,
  onNavigate,
  onToggleMenu,
  cartCount,
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
      <header className="w-full max-w-md mb-3 px-3 hidden sm:flex items-center justify-between text-xs text-[#74513e] font-medium">
        <div className="flex items-center gap-2">
          <CookieLogo size={24} />
          <span className="font-extrabold text-[#523628] tracking-wide">
            COOKIE FLUFFS
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fce7f3] border border-[#fbcfe8] text-[#be185d] font-bold">
            Artisan Cookie Shop
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Platform Switcher */}
          <button
            onClick={() => setPlatformMode(platformMode === 'ios' ? 'md' : 'ios')}
            className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-[#523628] text-[10px] font-bold transition flex items-center gap-1 border border-[#fbcfe8] cursor-pointer shadow-2xs"
            title="Switch between iOS and Material Design styling"
          >
            <span>{platformMode === 'ios' ? ' iOS Mode' : '🤖 MD (Android)'}</span>
          </button>

          {/* Viewport Frame Toggle */}
          <button
            onClick={() => setIsDeviceFrame(!isDeviceFrame)}
            className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-[#523628] border border-[#fbcfe8] transition cursor-pointer shadow-2xs"
            title={isDeviceFrame ? 'Switch to Full Screen View' : 'Switch to Phone Chassis'}
          >
            {isDeviceFrame ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Mobile Chassis / Canvas */}
      <IonPage
        id="main-content"
        className={`w-full relative transition-all duration-300 flex flex-col bg-[#fff5f7] overflow-hidden ${
          isDeviceFrame
            ? 'max-w-[390px] h-[844px] rounded-[44px] border-[10px] border-[#4a3024] phone-shadow sm:my-auto'
            : 'max-w-xl min-h-screen sm:rounded-3xl sm:border border-[#fbcfe8]'
        }`}
      >
        {/* Phone Status Bar (Emulated iOS / Android Top Notch with matching pink tint) */}
        <div
          className={`h-11 bg-[#fff5f7] text-[#4a3024] px-6 flex items-center justify-between text-[11px] font-bold flex-shrink-0 z-30 select-none border-b border-[#fce7f3] ${
            platformMode === 'ios' ? 'pt-1' : ''
          }`}
        >
          <span>9:41</span>

          {/* Dynamic Island Pill (iOS mode) */}
          {platformMode === 'ios' && (
            <div className="w-24 h-4 bg-[#523628]/15 rounded-full flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#ec4899]/50" />
            </div>
          )}

          <div className="flex items-center gap-1.5 opacity-80 text-[#74513e]">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Ionic Header & Toolbar in pink-dominant theme */}
        <IonHeader className="z-30 flex-shrink-0 border-b border-[#fce7f3] shadow-2xs">
          <IonToolbar
            id="ion-header-toolbar"
            className="h-14 bg-[#fff5f7]/95 backdrop-blur-md text-[#4a3024] px-3.5 [--background:transparent] [--border-color:transparent] [--color:#4a3024]"
          >
            {/* Left: Ionic Menu Button (ion-menu-button) */}
            <IonButtons slot="start">
              <button
                id="ion-menu-button"
                onClick={onToggleMenu}
                className="p-2 rounded-xl text-[#4a3024] hover:bg-[#fce7f3] active:scale-95 transition flex items-center justify-center focus:outline-none cursor-pointer"
                aria-label="Open Side Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </IonButtons>

            {/* Center: Page Title (ion-title) */}
            <IonTitle
              className={`px-2 ${
                platformMode === 'ios' ? 'text-center' : 'text-left pl-2'
              }`}
            >
              <h1 className="text-sm font-bold tracking-tight text-[#4a3024] font-serif truncate">
                {headerInfo.title}
              </h1>
              <p className="text-[10px] text-[#74513e] font-sans font-medium truncate -mt-0.5">
                {headerInfo.subtitle}
              </p>
            </IonTitle>

            {/* Right Actions: Search icon, Cart Badge, and User Profile */}
            <IonButtons slot="end" className="flex items-center gap-1">
              <button
                onClick={() => onNavigate('products')}
                className="p-2 rounded-xl text-[#4a3024] hover:bg-[#fce7f3] active:scale-95 transition focus:outline-none cursor-pointer"
                aria-label="Search Cookies"
                title="Search Cookies"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                id="ion-cart-button"
                onClick={() => onNavigate('cart')}
                className="p-2 rounded-xl text-[#4a3024] hover:bg-[#fce7f3] active:scale-95 transition relative focus:outline-none cursor-pointer"
                aria-label="Open Cookie Box"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    id="cart-badge-counter"
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#ec4899] text-white text-[9px] font-black flex items-center justify-center shadow-xs"
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Profile Avatar Shortcut */}
              <button
                id="btn-navbar-profile"
                onClick={() => onNavigate('profile')}
                className="w-8 h-8 rounded-full bg-[#fce7f3] border border-[#fbcfe8] text-[#523628] text-xs font-bold flex items-center justify-center hover:bg-[#fbcfe8] active:scale-95 transition ml-1 cursor-pointer"
                title="My Account"
                aria-label="My Account"
              >
                JR
              </button>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        {/* Ionic Scroll Content (ion-content) with pink-dominant clean background */}
        <IonContent
          id="ion-content-scroll"
          className="flex-1 no-scrollbar relative [--background:#fff5f7] [--color:#4a3024]"
        >
          <div className="p-4">
            {children}
          </div>
        </IonContent>

        {/* Ionic Bottom Navigation Bar (ion-tab-bar) */}
        <nav
          id="ion-bottom-tab-bar"
          className="h-14 bg-white/95 border-t border-[#fce7f3] px-2 flex items-center justify-around z-30 flex-shrink-0 backdrop-blur-md"
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
                className={`relative flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'text-[#523628] font-bold scale-105'
                    : 'text-[#74513e]/70 hover:text-[#523628]'
                }`}
              >
                <div
                  className={`p-1 rounded-lg relative ${
                    tab.highlight && isActive
                      ? 'bg-[#ec4899] text-white'
                      : tab.highlight
                      ? 'bg-[#fce7f3] text-[#ec4899]'
                      : isActive
                      ? 'bg-[#fce7f3] text-[#523628]'
                      : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.badge && tab.badge > 0 ? (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#ec4899] text-white text-[8px] font-bold flex items-center justify-center">
                      {tab.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[9px] mt-0.5 tracking-tight">{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 w-4 h-0.5 rounded-full bg-[#ec4899]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Emulated Home Bar Indicator (iOS) */}
        {platformMode === 'ios' && (
          <div className="h-3.5 bg-white/95 flex items-center justify-center flex-shrink-0">
            <div className="w-28 h-1 bg-[#523628]/20 rounded-full" />
          </div>
        )}
      </IonPage>
    </div>
  );
};
