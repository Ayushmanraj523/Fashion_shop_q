import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants';
import { generateId } from '../utils/helpers';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART_ITEMS);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART_ITEMS, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const newItem = { ...product, cartId: generateId() };
    setCartItems(prev => [...prev, newItem]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
      return total + price;
    }, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    cartCount: cartItems.length
  };
};