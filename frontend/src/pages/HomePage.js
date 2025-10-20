import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ addToCart, categoryFilter, setCategoryFilter, isLoggedIn, setShowLoginModal, searchQuery, setSearchQuery, sortBy, setSortBy, priceRange, setPriceRange, selectedBrands, setSelectedBrands, ratingFilter, setRatingFilter }) => {
  const navigate = useNavigate();
  const { category: selectedCategory, subCategory: selectedSubCategory } = categoryFilter;

  const allProducts = [
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
      name: 'Men Formal Shirt', 
      price: '₹899', 
      originalPrice: '₹1,499',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop',
      rating: 4.4,
      discount: '40% OFF',
      tag: 'Bestseller',
      category: 'men',
      subCategory: 'shirt',
      brand: 'Style Co'
    },
    { 
      name: 'Men Slim Fit Jeans', 
      price: '₹1,299', 
      originalPrice: '₹2,199',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop',
      rating: 4.6,
      discount: '41% OFF',
      tag: 'Popular',
      category: 'men',
      subCategory: 'jeans',
      brand: 'Denim Co'
    },
    { 
      name: 'Men Running Shoes', 
      price: '₹2,499', 
      originalPrice: '₹3,999',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop',
      rating: 4.7,
      discount: '38% OFF',
      tag: 'Trending',
      category: 'men',
      subCategory: 'shoes',
      brand: 'SportMax'
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
      name: 'Women Casual Top', 
      price: '₹699', 
      originalPrice: '₹1,199',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      rating: 4.2,
      discount: '42% OFF',
      tag: 'Popular',
      category: 'women',
      subCategory: 'top',
      brand: 'Trendy'
    },
    { 
      name: 'Women Designer Saree', 
      price: '₹3,499', 
      originalPrice: '₹5,999',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop',
      rating: 4.9,
      discount: '42% OFF',
      tag: 'Premium',
      category: 'women',
      subCategory: 'saree',
      brand: 'Royal Silk'
    },
    { 
      name: 'Women Heels', 
      price: '₹1,899', 
      originalPrice: '₹2,999',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=400&fit=crop',
      rating: 4.4,
      discount: '37% OFF',
      tag: 'Bestseller',
      category: 'women',
      subCategory: 'footwear',
      brand: 'Heel House'
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
      name: 'Kids Jeans', 
      price: '₹699', 
      originalPrice: '₹1,199',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&h=400&fit=crop',
      rating: 4.2,
      discount: '42% OFF',
      tag: 'Popular',
      category: 'kids',
      subCategory: 'jeans',
      brand: 'Junior'
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
    },
    { 
      name: 'Wireless Headphones', 
      price: '₹2,999', 
      originalPrice: '₹4,999',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=400&fit=crop',
      rating: 4.4,
      discount: '40% OFF',
      tag: 'Trending',
      category: 'electronics',
      subCategory: 'audio',
      brand: 'SoundPro'
    }
  ];

  const getFilteredProducts = () => {
    let filtered = [...allProducts];
    
    // Search filter takes priority
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      // Category filters
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      
      if (selectedSubCategory !== 'all') {
        filtered = filtered.filter(product => product.subCategory === selectedSubCategory);
      }
    }
    
    // Brand filter
    if (selectedBrands && selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Price filter
    if (priceRange && priceRange.length === 2) {
      filtered = filtered.filter(product => {
        const price = parseInt(product.price.replace('₹', '').replace(',', ''));
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }
    
    // Rating filter
    if (ratingFilter && ratingFilter > 0) {
      filtered = filtered.filter(product => product.rating >= ratingFilter);
    }
    
    // Sort products
    if (sortBy) {
      filtered.sort((a, b) => {
        const priceA = parseInt(a.price.replace('₹', '').replace(',', ''));
        const priceB = parseInt(b.price.replace('₹', '').replace(',', ''));
        
        switch (sortBy) {
          case 'price-low':
            return priceA - priceB;
          case 'price-high':
            return priceB - priceA;
          case 'rating':
            return b.rating - a.rating;
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
    }
    
    return filtered;
  };

  // Force re-render when filters change
  const [filterKey, setFilterKey] = useState(0);
  useEffect(() => {
    setFilterKey(prev => prev + 1);
  }, [sortBy, priceRange, selectedBrands, ratingFilter, searchQuery, selectedCategory, selectedSubCategory]);

  const trendingProducts = getFilteredProducts();
  
  // Debug logging
  console.log('HomePage - Search Query:', searchQuery);
  console.log('HomePage - Filter state:', { sortBy, priceRange, selectedBrands, ratingFilter });
  console.log('HomePage - Filtered products count:', trendingProducts.length);
  
  // Log first few filtered products for debugging
  if (trendingProducts.length > 0) {
    console.log('First filtered product:', trendingProducts[0].name);
  }

  return (
    <div className="home">
      <section className="hero-banner">
        <div className="banner-carousel">
          <div className="banner-slide">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=500&fit=crop" alt="Fashion Sale" />
            <div className="banner-overlay">
              <div className="banner-content">
                <h1>End of Season Sale</h1>
                <p>Up to 70% OFF on Fashion & Lifestyle</p>
                <button className="shop-now-btn" onClick={() => setCategoryFilter({ category: 'all', subCategory: 'all' })}>
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="filter-section">
        <div className="filter-container">
          <button 
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => { setCategoryFilter({ category: 'all', subCategory: 'all' }); setSearchQuery(''); }}
          >
            All Products
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'men' ? 'active' : ''}`}
            onClick={() => { setCategoryFilter({ category: 'men', subCategory: 'all' }); setSearchQuery(''); }}
          >
            Men
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'women' ? 'active' : ''}`}
            onClick={() => { setCategoryFilter({ category: 'women', subCategory: 'all' }); setSearchQuery(''); }}
          >
            Women
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'kids' ? 'active' : ''}`}
            onClick={() => { setCategoryFilter({ category: 'kids', subCategory: 'all' }); setSearchQuery(''); }}
          >
            Kids
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'electronics' ? 'active' : ''}`}
            onClick={() => { setCategoryFilter({ category: 'electronics', subCategory: 'all' }); setSearchQuery(''); }}
          >
            Electronics
          </button>
        </div>
      </section>
      
      <section className="products-section">
        <div className="products-header">
          <h2>
            {searchQuery ? `Search Results for "${searchQuery}"` :
             selectedCategory === 'all' ? 'Trending Now' : 
             selectedSubCategory !== 'all' ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} ${selectedSubCategory.charAt(0).toUpperCase() + selectedSubCategory.slice(1)}` :
             selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h2>
          <p>{trendingProducts.length} products found</p>
          {searchQuery && (
            <button 
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </button>
          )}
        </div>
        
        <div className="products-grid">
          {trendingProducts.map((product, index) => (
            <div key={index} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-badges">
                  <span className="discount-badge">{product.discount}</span>
                  {product.tag && <span className="product-tag">{product.tag}</span>}
                </div>
                <div className="product-overlay">
                  <button className="quick-view-btn">Quick View</button>
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
                  <span className="rating-text">({product.rating}) • 2.5k reviews</span>
                </div>
                <div className="price-container">
                  <span className="current-price">{product.price}</span>
                  <span className="original-price">{product.originalPrice}</span>
                </div>
                <div className="delivery-info">
                  <span>🚚 Free delivery</span>
                </div>
                <div className="product-actions">
                  <button 
                    className="add-to-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Bag
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
      </section>

      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Stay in the Loop</h2>
          <p>Get the latest updates on new arrivals, exclusive offers, and fashion trends</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </section>

      <section className="categories-showcase">
        <div className="categories-header">
          <h2>Shop by Category</h2>
          <p>Discover our latest collections</p>
        </div>
        <div className="categories-grid">
          <div className="category-tile" onClick={() => { setCategoryFilter({ category: 'men', subCategory: 'all' }); setSearchQuery(''); }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" alt="Men's Fashion" />
            <div className="category-overlay">
              <h3>Men's Fashion</h3>
              <p>Starting ₹399</p>
            </div>
          </div>
          <div className="category-tile" onClick={() => { setCategoryFilter({ category: 'women', subCategory: 'all' }); setSearchQuery(''); }}>
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop" alt="Women's Fashion" />
            <div className="category-overlay">
              <h3>Women's Fashion</h3>
              <p>Starting ₹299</p>
            </div>
          </div>
          <div className="category-tile" onClick={() => { setCategoryFilter({ category: 'kids', subCategory: 'all' }); setSearchQuery(''); }}>
            <img src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=500&fit=crop" alt="Kids Fashion" />
            <div className="category-overlay">
              <h3>Kids Fashion</h3>
              <p>Starting ₹199</p>
            </div>
          </div>
          <div className="category-tile" onClick={() => { setCategoryFilter({ category: 'electronics', subCategory: 'all' }); setSearchQuery(''); }}>
            <img src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=500&fit=crop" alt="Electronics" />
            <div className="category-overlay">
              <h3>Electronics</h3>
              <p>Starting ₹999</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Free Shipping</h3>
            <p>Free delivery on orders above ₹999</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Cash on Delivery</h3>
            <p>Pay when you receive your order</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>30-day hassle-free returns</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>100% Authentic</h3>
            <p>Original products guaranteed</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;