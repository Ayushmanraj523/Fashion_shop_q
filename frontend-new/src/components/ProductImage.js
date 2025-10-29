import React, { useState } from 'react';

const ProductImage = ({ src, alt, className }) => {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  const fallbackImages = [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=300&h=400&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=400&fit=crop&auto=format'
  ];

  const getRandomFallback = () => {
    return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
  };

  const handleImageError = () => {
    setImageError(true);
    setLoading(false);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      )}
      <img
        src={imageError ? getRandomFallback() : src}
        alt={alt}
        className={className}
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.3s ease' }}
      />
    </div>
  );
};

export default ProductImage;