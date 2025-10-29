import { API_CONFIG } from '../config/api';
import { API_BASE_URL } from '../constants';

export const productService = {
  async getAllProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'GET',
        headers: API_CONFIG.headers
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Product service error:', error);
      throw error;
    }
  },

  async searchProducts(query) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: API_CONFIG.headers
      });
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Product search error:', error);
      throw error;
    }
  }
};