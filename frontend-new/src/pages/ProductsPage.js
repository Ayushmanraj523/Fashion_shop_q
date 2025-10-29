import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductImage from '../components/ProductImage';

const ProductsPage = ({ addToCart, isLoggedIn, setShowLoginModal }) => {
  const navigate = useNavigate();
  const [products] = useState([
    { name: 'Men Cotton T-Shirt', price: '₹599', originalPrice: '₹999', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop', rating: 4.3, discount: '40% OFF', tag: 'New', category: 'men', subCategory: 'tshirt', brand: 'Fashion Hub' },
    { name: 'Men Polo Shirt', price: '₹799', originalPrice: '₹1,299', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=400&fit=crop', rating: 4.4, discount: '38% OFF', tag: 'Popular', category: 'men', subCategory: 'shirt', brand: 'Style Co' },
    { name: 'Men Hoodie', price: '₹1,199', originalPrice: '₹1,999', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=300&h=400&fit=crop&auto=format', rating: 4.6, discount: '40% OFF', tag: 'Trending', category: 'men', subCategory: 'hoodie', brand: 'Urban Style' },
    { name: 'Men Formal Shirt', price: '₹899', originalPrice: '₹1,499', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop', rating: 4.4, discount: '40% OFF', tag: 'Bestseller', category: 'men', subCategory: 'shirt', brand: 'Style Co' },
    { name: 'Women Summer Dress', price: '₹1,299', originalPrice: '₹2,199', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop', rating: 4.5, discount: '41% OFF', tag: 'New', category: 'women', subCategory: 'dress', brand: 'Elegance' },
    { name: 'Women Kurti', price: '₹899', originalPrice: '₹1,499', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop&auto=format', rating: 4.3, discount: '40% OFF', tag: 'Bestseller', category: 'women', subCategory: 'kurti', brand: 'Ethnic Wear' },
    { name: 'Women Jeans', price: '₹1,099', originalPrice: '₹1,799', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=400&fit=crop', rating: 4.5, discount: '39% OFF', tag: 'Popular', category: 'women', subCategory: 'jeans', brand: 'Denim Co' },
    { name: 'Kids T-Shirt', price: '₹399', originalPrice: '₹699', image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=300&h=400&fit=crop', rating: 4.3, discount: '43% OFF', tag: 'New', category: 'kids', subCategory: 'tshirt', brand: 'Little Star' },
    { name: 'Kids Dress', price: '₹599', originalPrice: '₹999', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=300&h=400&fit=crop', rating: 4.4, discount: '40% OFF', tag: 'Cute', category: 'kids', subCategory: 'dress', brand: 'Little Star' },
    { name: 'Smartphone', price: '₹15,999', originalPrice: '₹24,999', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=400&fit=crop', rating: 4.6, discount: '36% OFF', tag: 'Bestseller', category: 'electronics', subCategory: 'phone', brand: 'TechMax' },
    { name: 'Laptop', price: '₹45,999', originalPrice: '₹65,999', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=400&fit=crop', rating: 4.6, discount: '30% OFF', tag: 'Bestseller', category: 'electronics', subCategory: 'laptop', brand: 'TechMax' },
    { name: 'Smart Watch', price: '₹3,999', originalPrice: '₹6,999', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop', rating: 4.5, discount: '43% OFF', tag: 'Smart', category: 'electronics', subCategory: 'watch', brand: 'TechMax' }
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
              <ProductImage src={product.image} alt={product.name} className="product-image" />
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
                    addToCart(product);
                    navigate('/checkout');
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