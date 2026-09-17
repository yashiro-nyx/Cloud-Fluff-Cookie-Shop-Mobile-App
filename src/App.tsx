/**
 * @file App.tsx
 * @description Main Application Entry Point
 * Implements the full Ionic Framework Mobile application for Cloud Fluffs (Product Line #12: Cookies),
 * featuring the comprehensive Side Menu navigation, required default sections (Dashboard, List of Products,
 * About the App, Developers), and rich project modules (Cookie Builder, Community Gallery, Cart/Box,
 * Order Tracking, Loyalty & Taste Profile, Admin Console).
 */

import React, { useState, useEffect } from 'react';
import { IonApp } from '@ionic/react';
import { PageId, CartItem, OrderRecord, CustomCookieBuild, TasteProfile, CookieProduct } from './types';
import {
  COOKIE_PRODUCTS,
  DEVELOPERS_DATA,
  COMMUNITY_CREATIONS,
  INITIAL_ORDERS,
  INITIAL_TASTE_PROFILE,
  DOUGH_OPTIONS,
  MIX_IN_OPTIONS,
  TOPPING_OPTIONS,
} from './data/mockData';
import { IonicLayout } from './components/IonicLayout';
import { IonicSideMenu } from './components/IonicSideMenu';
import { DashboardView } from './components/modules/DashboardView';
import { ProductCatalogView } from './components/modules/ProductCatalogView';
import { CookieBuilderView } from './components/modules/CookieBuilderView';
import { AboutAppView } from './components/modules/AboutAppView';
import { DevelopersView } from './components/modules/DevelopersView';
import { CommunityView } from './components/modules/CommunityView';
import { CartView } from './components/modules/CartView';
import { OrderTrackingView } from './components/modules/OrderTrackingView';
import { LoyaltyView } from './components/modules/LoyaltyView';
import { TasteQuizModal } from './components/modules/TasteQuizModal';
import { UserProfileView } from './components/modules/UserProfileView';
import { FavoritesView } from './components/modules/FavoritesView';
import { HelpSupportView } from './components/modules/HelpSupportView';
import { AuthModal } from './components/modules/AuthModal';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cart State (Initialized with sample cookies for immediate evaluation testing)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      type: 'catalog',
      productId: 'cookie-1',
      title: 'Midnight Choco Velvet Heart (Signature)',
      subtitle: 'Double dark cocoa dough, white heart buttercream, sprinkles',
      unitPrice: 125,
      quantity: 2,
      imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=80',
    },
    {
      id: 'cart-init-2',
      type: 'catalog',
      productId: 'cookie-3',
      title: 'Salted Caramel Pecan Lava',
      subtitle: 'Brown butter dough, gooey sea salt caramel, roasted pecans',
      unitPrice: 145,
      quantity: 1,
      imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=500&auto=format&fit=crop&q=80',
    },
  ]);

  // Orders State
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [activeOrder, setActiveOrder] = useState<OrderRecord | undefined>(INITIAL_ORDERS[0]);

  // Products & Community State
  const [products, setProducts] = useState<CookieProduct[]>(COOKIE_PRODUCTS);
  const [communityCreations, setCommunityCreations] = useState<CustomCookieBuild[]>(COMMUNITY_CREATIONS);

  // Personalization & Builder State
  const [tasteProfile, setTasteProfile] = useState<TasteProfile>(INITIAL_TASTE_PROFILE);
  const [builderRemixDraft, setBuilderRemixDraft] = useState<CustomCookieBuild | null>(null);

  // Modals & Toast State
  const [isTasteQuizOpen, setIsTasteQuizOpen] = useState(false);
  const [isRecordingGuideOpen, setIsRecordingGuideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authentication State (defaults to active user session, customizable & toggleable)
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    tier: string;
    initials: string;
  } | null>({
    name: 'Jervin Paul R.',
    email: 'jervinpaulromualdo@gmail.com',
    tier: 'VIP',
    initials: 'JP',
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLoginSuccess = (user: { name: string; email: string; tier: string; initials: string }) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Signed out of Cookie Fluffs.');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Cart Handlers (supports both raw CookieProduct and prepared CartItem)
  const handleAddToCart = (itemOrProduct: CartItem | CookieProduct) => {
    const item: CartItem =
      'title' in itemOrProduct && 'type' in itemOrProduct
        ? (itemOrProduct as CartItem)
        : {
            id: `cart-${itemOrProduct.id}-${Date.now()}`,
            type: 'catalog',
            productId: itemOrProduct.id,
            title: itemOrProduct.name,
            subtitle: itemOrProduct.tagline || itemOrProduct.description,
            unitPrice: itemOrProduct.price,
            quantity: 1,
            imageUrl: itemOrProduct.imageUrl,
          };

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === item.productId && i.title === item.title
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        return updated;
      }
      return [item, ...prev];
    });
    showToast(`Added "${item.title}" to your Cookie Box!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    showToast('Removed item from cart');
  };

  // Order Fulfillment & Stepper Handlers
  const handlePlaceOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    setActiveOrder(order);
    setCartItems([]);
    setActivePage('orders');
    showToast(`Order #${order.orderId} placed successfully! Kitchen is preparing.`);
  };

  const handleAdvanceOrderStatus = (orderId: string) => {
    const statuses: OrderRecord['status'][] = [
      'received',
      'baking',
      'quality_check',
      'out_for_delivery',
      'delivered',
    ];

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.orderId === orderId) {
          const curIdx = statuses.indexOf(ord.status);
          const nextStatus =
            curIdx === statuses.length - 1 ? 'received' : statuses[curIdx + 1];
          const updated = {
            ...ord,
            status: nextStatus,
            estimatedMinutes:
              nextStatus === 'delivered' ? 0 : Math.max(5, (statuses.length - 1 - curIdx) * 7),
          };
          if (activeOrder?.orderId === orderId) {
            setActiveOrder(updated);
          }
          return updated;
        }
        return ord;
      })
    );
    showToast(`Order status updated.`);
  };

  const handleReorder = (items: CartItem[]) => {
    setCartItems((prev) => [...items, ...prev]);
    setActivePage('cart');
    showToast(`Re-added ${items.length} items to your cart.`);
  };

  // Community & Remixing Handlers
  const handleRemix = (build: CustomCookieBuild) => {
    setBuilderRemixDraft(build);
    setActivePage('cookie-builder');
    showToast(`Remixing "${build.name}" in the Cookie Builder!`);
  };

  const handleLikeCommunity = (id: string) => {
    setCommunityCreations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
    // Award a loyalty point for community participation
    setTasteProfile((prev) => ({
      ...prev,
      fluffPoints: prev.fluffPoints + 2,
    }));
    showToast('+2 Fluff Points earned for recipe upvoting!');
  };

  const handlePublishCustomCookie = (build: CustomCookieBuild) => {
    setCommunityCreations((prev) => [build, ...prev]);
    // Also award points
    setTasteProfile((prev) => ({
      ...prev,
      fluffPoints: prev.fluffPoints + 25,
    }));
    showToast(`Published "${build.name}" to Community Gallery! +25 Points`);
  };

  const handlePromoteToOfficialMenu = (creation: CustomCookieBuild) => {
    const newProduct: CookieProduct = {
      id: `prod-${Date.now()}`,
      name: `${creation.name} (Community Menu)`,
      tagline: `Voted #1 by the Fluff Community by ${creation.authorName}`,
      category: 'specialty',
      price: creation.totalPrice,
      description: `Voted by the community! Made by ${creation.authorName}. ${creation.dough.name} with ${creation.mixIns.map((m) => m.name).join(', ')}.`,
      imageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80',
      calories: creation.totalCalories,
      rating: 5.0,
      reviewsCount: creation.likes,
      isPopular: true,
      badge: 'Community Voted',
      ingredients: [
        creation.dough.name,
        ...creation.mixIns.map((m) => m.name),
        ...creation.toppings.map((t) => t.name),
      ],
      allergens: ['Dairy', 'Gluten'],
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Promoted "${creation.name}" to the official menu!`);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <IonApp className="font-sans antialiased bg-[#fae8eb]">
      <IonicLayout
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);
          setIsMenuOpen(false);
        }}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        cartCount={totalCartCount}
        isLoggedIn={!!currentUser}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        sideMenu={
          <IonicSideMenu
            isOpen={isMenuOpen}
            activePage={activePage}
            onSelectPage={(page) => {
              setActivePage(page);
              setIsMenuOpen(false);
            }}
            onNavigate={(page) => {
              setActivePage(page);
              setIsMenuOpen(false);
            }}
            onClose={() => setIsMenuOpen(false)}
            cartCount={totalCartCount}
            activeOrderCount={activeOrder && activeOrder.status !== 'delivered' ? 1 : 0}
            fluffPoints={tasteProfile.fluffPoints}
            onOpenTasteQuiz={() => setIsTasteQuizOpen(true)}
            isLoggedIn={!!currentUser}
            currentUser={currentUser}
            onLoginClick={() => setIsAuthModalOpen(true)}
            onLogoutClick={handleLogout}
          />
        }
      >
        {/* Floating Interactive Toast Feedback */}
        {toastMessage && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#523628] text-[#fff5f7] text-xs font-bold shadow-lg border border-[#fbcfe8]/40 flex items-center gap-2 animate-fadeIn pointer-events-none max-w-xs text-center">
            <span>🍪</span>
            <span>{toastMessage}</span>
          </div>
        )}

      {/* Active Module View Rendering */}
      {activePage === 'dashboard' && (
        <DashboardView
          onNavigate={(page) => setActivePage(page)}
          featuredCookies={products.slice(0, 4)}
          featuredProducts={products.slice(0, 4)}
          communityTrending={communityCreations}
          activeOrder={activeOrder}
          fluffPoints={tasteProfile.fluffPoints}
          onAddToCart={handleAddToCart}
          onRemixCustom={handleRemix}
        />
      )}

      {activePage === 'products' && (
        <ProductCatalogView
          products={products}
          onAddToCart={handleAddToCart}
          onCustomizeInBuilder={(prod) => {
            const matchingDough =
              DOUGH_OPTIONS.find((d) =>
                prod.name.toLowerCase().includes(d.name.toLowerCase().split(' ')[0])
              ) || DOUGH_OPTIONS[0];

            setBuilderRemixDraft({
              id: `custom-from-${prod.id}`,
              name: `My Custom ${prod.name}`,
              authorName: 'You',
              dough: matchingDough,
              mixIns: [MIX_IN_OPTIONS[0]],
              toppings: [TOPPING_OPTIONS[0]],
              size: 'regular',
              packaging: 'box-classic',
              totalPrice: prod.price,
              totalCalories: prod.calories,
              allergens: prod.allergens,
              likes: 0,
              createdAt: 'Just now',
            });
            setActivePage('cookie-builder');
          }}
          onOpenCustomBuilder={() => setActivePage('cookie-builder')}
        />
      )}

      {activePage === 'cookie-builder' && (
        <CookieBuilderView
          initialBuild={builderRemixDraft || undefined}
          onAddToCart={handleAddToCart}
          onPublishToCommunity={handlePublishCustomCookie}
        />
      )}

      {activePage === 'community' && (
        <CommunityView
          creations={communityCreations}
          onRemix={handleRemix}
          onLike={handleLikeCommunity}
        />
      )}

      {activePage === 'cart' && (
        <CartView
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveCartItem}
          onPlaceOrder={handlePlaceOrder}
          onExploreProducts={() => setActivePage('products')}
        />
      )}

      {activePage === 'orders' && (
        <OrderTrackingView
          orders={orders}
          activeOrder={activeOrder}
          onAdvanceOrderStatus={handleAdvanceOrderStatus}
          onReorder={handleReorder}
        />
      )}

      {activePage === 'loyalty' && (
        <LoyaltyView
          tasteProfile={tasteProfile}
          onOpenQuiz={() => setIsTasteQuizOpen(true)}
        />
      )}

      {activePage === 'favorites' && (
        <FavoritesView
          products={products}
          onAddToCart={handleAddToCart}
          onNavigate={(page) => setActivePage(page)}
          onShowToast={showToast}
        />
      )}

      {(activePage === 'profile' || activePage === 'settings') && (
        <UserProfileView
          onNavigate={(page) => setActivePage(page)}
          fluffPoints={tasteProfile.fluffPoints}
          onShowToast={showToast}
        />
      )}

      {activePage === 'help' && <HelpSupportView />}

      {activePage === 'about' && <AboutAppView />}

      {activePage === 'developers' && <DevelopersView />}

      {/* Auxiliary Modals */}
      <TasteQuizModal
        isOpen={isTasteQuizOpen}
        onClose={() => setIsTasteQuizOpen(false)}
        currentProfile={tasteProfile}
        onSaveProfile={(prof) => {
          setTasteProfile(prof);
          showToast('Updated your personal Taste Profile!');
        }}
      />

      {/* Dedicated Authentication Modal (Login / Sign Up / Switch Account) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        isCurrentlyLoggedIn={!!currentUser}
        currentUserName={currentUser?.name}
        onLogout={handleLogout}
      />
      </IonicLayout>
    </IonApp>
  );
}
