import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ cartCount, isLoggedIn, setIsLoggedIn, currentUser, onCategoryFilter, onSearch, onHomeNavigation, sortBy, setSortBy, priceRange, setPriceRange, selectedBrands, setSelectedBrands, ratingFilter, setRatingFilter }) => {
  const navigate = useNavigate();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const searchSuggestions = [
    'Men T-Shirt', 'Women Dress', 'Kids Jeans', 'Running Shoes', 'Formal Shirt',
    'Summer Dress', 'Casual Top', 'Designer Saree', 'Heels', 'Smartphone',
    'Headphones', 'Cotton', 'Denim', 'Silk'
  ];

  const availableBrands = ['Fashion Hub', 'Style Co', 'Denim Co', 'SportMax', 'Elegance'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        console.log('Clicking outside account menu, closing...');
        setShowAccountMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debug account menu state
  useEffect(() => {
    console.log('Account menu state changed:', showAccountMenu);
  }, [showAccountMenu]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAccountMenu(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const getUserName = () => {
    if (currentUser && currentUser.name) {
      return currentUser.name.split(' ')[0];
    }
    return 'User';
  };

  const getFilteredSuggestions = () => {
    if (!searchQuery) return [];
    return searchSuggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6);
  };

  const handleSearch = (query = searchQuery) => {
    const trimmedQuery = query ? query.trim() : '';
    if (trimmedQuery) {
      onSearch && onSearch(trimmedQuery);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
        setShowSuggestions(false);
      }
    }
  };

  const handleBrandToggle = (brand) => {
    const newBrands = selectedBrands.includes(brand) 
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
  };

  const clearAllFilters = () => {
    setSortBy('relevance');
    setPriceRange([0, 50000]);
    setSelectedBrands([]);
    setRatingFilter(0);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-content">
          <div className="logo" onClick={() => { onHomeNavigation(); navigate('/'); }}>
            <img src="/ar-logo.png" alt="Ayushman Rishu Fashion Shop" className="logo-image" />
            <span className="logo-text">FASHION SHOP</span>
          </div>
          
          <div className="advanced-search-container" ref={searchRef}>
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search products, brands, categories..."
                className="advanced-search-input"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyDown={handleKeyPress}
                onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => {
                  setSearchQuery('');
                  onSearch && onSearch('');
                }}>×</button>
              )}
            </div>
            <div className="search-actions">
              <button className="advanced-filter-btn" onClick={() => setShowFilters(!showFilters)}>
                <span className="filter-icon">⚙️</span>
                <span>Filters</span>
                {(selectedBrands.length > 0 || ratingFilter > 0 || priceRange[1] < 50000) && (
                  <span className="filter-count">{selectedBrands.length + (ratingFilter > 0 ? 1 : 0) + (priceRange[1] < 50000 ? 1 : 0)}</span>
                )}
              </button>
              <button className="search-submit-btn" onClick={handleSearchClick}>
                Search
              </button>
            </div>
            
            {showSuggestions && getFilteredSuggestions().length > 0 && (
              <div className="search-suggestions">
                {getFilteredSuggestions().map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    🔍 {suggestion}
                  </div>
                ))}
              </div>
            )}
            
            {showFilters && (
              <div className="advanced-filters-panel">
                <div className="filters-header">
                  <div className="filters-title">
                    <h3>Advanced Filters</h3>
                    <span className="active-filters-count">
                      {selectedBrands.length + (ratingFilter > 0 ? 1 : 0) + (priceRange[1] < 50000 ? 1 : 0)} active
                    </span>
                  </div>
                  <button className="close-filters-btn" onClick={() => setShowFilters(false)}>×</button>
                </div>
                
                <div className="filters-content">
                  <div className="filter-section">
                    <h4>Sort Options</h4>
                    <div className="sort-options">
                      {[
                        { value: 'relevance', label: 'Best Match', icon: '🎯' },
                        { value: 'price-low', label: 'Price: Low to High', icon: '💰' },
                        { value: 'price-high', label: 'Price: High to Low', icon: '💎' },
                        { value: 'rating', label: 'Highest Rated', icon: '⭐' },
                        { value: 'name', label: 'A to Z', icon: '🔤' }
                      ].map(option => (
                        <button
                          key={option.value}
                          className={`sort-option ${sortBy === option.value ? 'active' : ''}`}
                          onClick={() => setSortBy(option.value)}
                        >
                          <span className="sort-icon">{option.icon}</span>
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="filter-section">
                    <h4>Price Range</h4>
                    <div className="price-filter-advanced">
                      <div className="price-inputs">
                        <input 
                          type="number" 
                          placeholder="Min" 
                          value={priceRange[0]} 
                          onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                          className="price-input"
                        />
                        <span className="price-separator">to</span>
                        <input 
                          type="number" 
                          placeholder="Max" 
                          value={priceRange[1]} 
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
                          className="price-input"
                        />
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="50000" 
                        value={priceRange[1]} 
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="price-range-slider"
                      />
                      <div className="price-presets">
                        {[
                          { label: 'Under ₹500', range: [0, 500] },
                          { label: '₹500-₹1000', range: [500, 1000] },
                          { label: '₹1000-₹2000', range: [1000, 2000] },
                          { label: 'Above ₹2000', range: [2000, 50000] }
                        ].map(preset => (
                          <button
                            key={preset.label}
                            className={`price-preset ${priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1] ? 'active' : ''}`}
                            onClick={() => setPriceRange(preset.range)}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="filter-section">
                    <h4>Customer Rating</h4>
                    <div className="rating-filters">
                      {[4, 3, 2, 1].map(rating => (
                        <button
                          key={rating}
                          className={`rating-filter ${ratingFilter === rating ? 'active' : ''}`}
                          onClick={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
                        >
                          <span className="stars">{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span>
                          <span>{rating}+ Stars</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="filter-section">
                    <h4>Brands</h4>
                    <div className="brand-filters-advanced">
                      {availableBrands.map(brand => (
                        <label key={brand} className="brand-filter-item">
                          <input 
                            type="checkbox" 
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandToggle(brand)}
                          />
                          <span className="checkmark"></span>
                          <span className="brand-name">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="filters-footer">
                  <button className="clear-all-btn" onClick={clearAllFilters}>
                    Clear All Filters
                  </button>
                  <button className="apply-filters-btn" onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="header-actions">
          <button 
            className="cart-icon" 
            onClick={() => navigate('/cart')}
            title="Shopping Cart"
          >
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          
          {!isLoggedIn ? (
            <button 
              className="login-btn" 
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          ) : (
            <div className={`account-dropdown ${showAccountMenu ? 'show' : ''}`} ref={dropdownRef}>
              <button 
                className="account-btn"
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                style={{ 
                  background: showAccountMenu ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                  transform: showAccountMenu ? 'translateY(-1px)' : 'none'
                }}
              >
                <span className="account-icon">👤</span>
                <span>Account</span>
                <span className="dropdown-arrow" style={{ transform: showAccountMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
              </button>
              {showAccountMenu && (
                <div 
                  className="account-menu"
                  style={{
                    position: 'fixed',
                    top: '65px',
                    right: '15px',
                    display: 'block',
                    visibility: 'visible',
                    opacity: 1,
                    background: 'white',
                    zIndex: 2147483647,
                    border: '3px solid #667eea',
                    borderRadius: '12px',
                    boxShadow: '0 30px 100px rgba(0, 0, 0, 0.6)',
                    minWidth: '280px'
                  }}
                >
                  <div className="account-header">
                    <span className="user-icon">👤</span>
                    <div>
                      <div className="user-name">Hello {getUserName()}</div>
                      <div className="user-email">{currentUser?.contact || 'user@example.com'}</div>
                    </div>
                  </div>
                  <div className="menu-divider"></div>
                  <ul className="account-options">
                    <li><Link to="/orders" onClick={() => setShowAccountMenu(false)} style={{color: '#2c3e50', textDecoration: 'none'}}>📦 My Orders</Link></li>
                    <li><Link to="/wishlist" onClick={() => setShowAccountMenu(false)} style={{color: '#2c3e50', textDecoration: 'none'}}>❤️ Wishlist</Link></li>
                    <li><Link to="/coupons" onClick={() => setShowAccountMenu(false)} style={{color: '#2c3e50', textDecoration: 'none'}}>🎫 Coupons</Link></li>
                    <li><Link to="/rewards" onClick={() => setShowAccountMenu(false)} style={{color: '#2c3e50', textDecoration: 'none'}}>🎁 Rewards</Link></li>
                    <li><Link to="/profile" onClick={() => setShowAccountMenu(false)} style={{color: '#2c3e50', textDecoration: 'none'}}>⚙️ Account Settings</Link></li>
                    <li><Link to="/support" onClick={() => setShowAccountMenu(false)} style={{color: '#2c3e50', textDecoration: 'none'}}>❓ Customer Care</Link></li>
                    <li className="menu-divider"></li>
                    <li><button className="logout-btn" onClick={handleLogout}>🚪 Logout</button></li>
                  </ul>
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
      
      <div className="header-nav">
        <div className="nav-container">
          <nav className="main-nav">
            <span className="nav-link" onClick={() => { onHomeNavigation(); navigate('/'); }}>Home</span>
            <Link to="/products" className="nav-link">All Products</Link>
            <div className="dropdown">
              <span className="nav-link">Men ▼</span>
              <div className="dropdown-content">
                <span onClick={() => { onCategoryFilter('men', 'shirt'); navigate('/'); }}>Shirts</span>
                <span onClick={() => { onCategoryFilter('men', 'tshirt'); navigate('/'); }}>T-Shirts</span>
                <span onClick={() => { onCategoryFilter('men', 'jeans'); navigate('/'); }}>Jeans</span>
                <span onClick={() => { onCategoryFilter('men', 'shoes'); navigate('/'); }}>Shoes</span>
                <span onClick={() => { onCategoryFilter('men', 'hoodie'); navigate('/'); }}>Hoodies</span>
              </div>
            </div>
            <div className="dropdown">
              <span className="nav-link">Women ▼</span>
              <div className="dropdown-content">
                <span onClick={() => { onCategoryFilter('women', 'dress'); navigate('/'); }}>Dresses</span>
                <span onClick={() => { onCategoryFilter('women', 'top'); navigate('/'); }}>Tops</span>
                <span onClick={() => { onCategoryFilter('women', 'saree'); navigate('/'); }}>Sarees</span>
                <span onClick={() => { onCategoryFilter('women', 'kurti'); navigate('/'); }}>Kurtis</span>
                <span onClick={() => { onCategoryFilter('women', 'jeans'); navigate('/'); }}>Jeans</span>
              </div>
            </div>
            <span className="nav-link" onClick={() => { onCategoryFilter('kids', 'all'); navigate('/'); }}>Kids</span>
            <span className="nav-link" onClick={() => { onCategoryFilter('electronics', 'all'); navigate('/'); }}>Electronics</span>
            <Link to="/support" className="nav-link">Support</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;