import type { Product, CartItem, Order, User } from './index';

export interface CartStoreState {
  items: CartItem[];
  subtotal: number;
  healthScore: number;
  savings: number;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
}

export interface AuthStoreState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}\n