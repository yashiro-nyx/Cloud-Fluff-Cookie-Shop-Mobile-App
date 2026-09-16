/**
 * @file types.ts
 * @description Central TypeScript definitions for Cloud Fluffs Mobile Cookie Shop
 * Course: IT 005 - Integrative Programming and Technologies (TIP Cubao)
 * Architecture: Ionic Framework Side-Menu Navigation Mobile Model
 */

export type PageId =
  | 'dashboard'
  | 'products'
  | 'cookie-builder'
  | 'community'
  | 'cart'
  | 'orders'
  | 'loyalty'
  | 'favorites'
  | 'profile'
  | 'settings'
  | 'help'
  | 'about'
  | 'developers'
  | 'admin';

export interface UserAddress {
  id: string;
  label: string; // 'Home', 'Office', 'Campus'
  recipientName: string;
  phone: string;
  street: string;
  city: string;
  notes?: string;
  isDefault: boolean;
}

export interface SavedPaymentMethod {
  id: string;
  type: 'GCash' | 'Maya' | 'Card' | 'COD';
  accountTitle: string;
  accountNumberMasked: string;
  isDefault: boolean;
}

export interface UserAccountProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  membershipTier: string;
  birthday: string;
  fluffPoints: number;
  addresses: UserAddress[];
  paymentMethods: SavedPaymentMethod[];
  dietaryRestrictions: string[];
  notificationsEnabled: boolean;
  orderUpdatesEmail: boolean;
  marketingSms: boolean;
}

export type CookieCategory =
  | 'all'
  | 'classic'
  | 'nutty'
  | 'fruity'
  | 'indulgent'
  | 'dietary'
  | 'community'
  | 'specialty';

export interface CookieProduct {
  id: string;
  name: string;
  tagline: string;
  category: CookieCategory;
  price: number; // in Philippine Peso (₱)
  rating: number;
  reviewsCount: number;
  calories: number;
  allergens: string[];
  imageUrl: string;
  description: string;
  ingredients: string[];
  isSignature?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  badge?: string;
  flavorNotes?: string;
  aiMatchScore?: number;
  aiSensoryNote?: string;
  aiTasteProfile?: {
    sweetness: number; // out of 5
    chewiness: number; // out of 5
    richness: number; // out of 5
    pairing: string;
  };
}

export interface DoughOption {
  id: string;
  name: string;
  price: number;
  color: string;
  texture: string;
  calories: number;
  description: string;
}

export interface MixInOption {
  id: string;
  name: string;
  price: number;
  color: string;
  allergen?: string;
  calories: number;
}

export interface ToppingOption {
  id: string;
  name: string;
  price: number;
  color: string;
  calories: number;
}

export interface CustomCookieBuild {
  id: string;
  name: string;
  authorName: string;
  dough: DoughOption;
  mixIns: MixInOption[];
  toppings: ToppingOption[];
  size: 'regular' | 'chunky' | 'monster';
  packaging: 'kraft-pouch' | 'box-classic' | 'tin-holographic';
  totalPrice: number;
  totalCalories: number;
  allergens: string[];
  likes: number;
  createdAt: string;
  isOfficialCandidate?: boolean;
}

export interface CartItem {
  id: string;
  type: 'catalog' | 'custom';
  productId?: string;
  customBuild?: CustomCookieBuild;
  title: string;
  subtitle: string;
  unitPrice: number;
  quantity: number;
  imageUrl?: string;
  notes?: string;
}

export type OrderStatus =
  | 'received'
  | 'baking'
  | 'quality_check'
  | 'out_for_delivery'
  | 'delivered';

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  status: OrderStatus;
  estimatedMinutes: number;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'GCash' | 'Maya' | 'Card' | 'COD';
  fulfillmentType: 'delivery' | 'pickup';
  address: string;
  notes?: string;
}

export interface DeveloperProfile {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  skills: string[];
  favoriteCookie: string;
  tipEmail: string;
  isLeader?: boolean;
}

export interface TasteProfile {
  sweetToothLevel: number; // 1 - 5
  favoriteMixIns: string[];
  allergies: string[];
  fluffPoints: number;
  tier: 'Bronze Crumb' | 'Silver Baker' | 'Gold Fluff Master';
}
