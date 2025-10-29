// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8084';

// App Constants
export const APP_NAME = 'Fashion Shop Q';
export const APP_VERSION = '1.0.0';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
  PROFILE: '/profile',
  WISHLIST: '/wishlist',
  COUPONS: '/coupons',
  REWARDS: '/rewards',
  SUPPORT: '/support',
  PRODUCTS: '/products'
};

// Categories
export const CATEGORIES = {
  ALL: 'all',
  MEN: 'men',
  WOMEN: 'women',
  KIDS: 'kids',
  ELECTRONICS: 'electronics'
};

// Sort Options
export const SORT_OPTIONS = {
  RELEVANCE: 'relevance',
  PRICE_LOW: 'price-low',
  PRICE_HIGH: 'price-high',
  RATING: 'rating',
  NAME: 'name'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  CURRENT_USER: 'currentUser',
  CART_ITEMS: 'cartItems'
};