import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductsPage = ({ addToCart, isLoggedIn, setShowLoginModal }) => {
  const navigate = useNavigate();
  const [products] = useState([
    { 
      name: 'Men Cotton T-Shirt', 
      price: '₹599', 
      originalPrice: '₹999',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop',
      rating: 4.3,
      discount: '40% OFF',
      tag: 'New',
      category: 'men',
      subCategory: 'tshirt',
      brand: 'Fashion Hub'
    },
    { 
      name: 'Women Summer Dress', 
      price: '₹1,299', 
      originalPrice: '₹2,199',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
      rating: 4.5,
      discount: '41% OFF',
      tag: 'New',
      category: 'women',
      subCategory: 'dress',
      brand: 'Elegance'
    },
    { 
      name: 'Kids T-Shirt', 
      price: '₹399', 
      originalPrice: '₹699',
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=300&h=400&fit=crop',
      rating: 4.3,
      discount: '43% OFF',
      tag: 'New',
      category: 'kids',
      subCategory: 'tshirt',
      brand: 'Little Star'
    },
    { 
      name: 'Smartphone', 
      price: '₹15,999', 
      originalPrice: '₹24,999',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=400&fit=crop',
      rating: 4.6,
      discount: '36% OFF',
      tag: 'Bestseller',
      category: 'electronics',
      subCategory: 'phone',
      brand: 'TechMax'
    }
  ]);

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>All Products</h1>
        <p>{products.length} products available</p>
      </div>
      
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-badges">
                <span className="discount-badge">{product.discount}</span>
                {product.tag && <span className="product-tag">{product.tag}</span>}
              </div>
              <button className="wishlist-btn">♡</button>
            </div>
            
            <div className="product-info">
              <div className="brand-name">{product.brand}</div>
              <h3>{product.name}</h3>
              <div className="rating">
                <div className="stars">
                  {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}
                </div>
                <span className="rating-text">({product.rating})</span>
              </div>
              <div className="price-container">
                <span className="current-price">{product.price}</span>
                <span className="original-price">{product.originalPrice}</span>
              </div>
              <div className="product-actions">
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
                <button 
                  className="buy-now-btn"
                  onClick={() => {
                    if (!isLoggedIn) {
                      setShowLoginModal(true);
                      return;
                    }
                    navigate('/checkout', { state: { buyNowItem: product } });
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;