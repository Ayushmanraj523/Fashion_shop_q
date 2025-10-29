// Helper utilities
export const formatPrice = (price) => {
  if (typeof price === 'number') {
    return `₹${price.toLocaleString()}`;
  }
  return price;
};

export const formatRating = (rating) => {
  return Math.round(rating * 10) / 10;
};

export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};