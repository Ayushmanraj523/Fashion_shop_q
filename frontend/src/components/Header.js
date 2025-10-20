import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ cartCount, isLoggedIn, setIsLoggedIn, currentUser, onCategoryFilter, onSearch, sortBy, setSortBy, priceRange, setPriceRange, selectedBrands, setSelectedBrands, ratingFilter, setRatingFilter }) => {
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAccountMenu(false);
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
    if (query && query.trim()) {
      onSearch && onSearch(query.trim());
      setShowSuggestions(false);
      setSearchQuery('');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      e.preventDefault();
      handleSearch();
      setShowFilters(true);
    }
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSortBy('relevance');
    setPriceRange([0, 50000]);
    setSelectedBrands([]);
    setRatingFilter(0);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      handleSearch();
      setShowFilters(true);
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-content">
          <div className="logo" onClick={() => { navigate('/'); window.location.reload(); }}>
            <div className="logo-icon">FS</div>
            <span>Fashion Shop</span>
          </div>
          
          <div className="search-container" ref={searchRef}>
            <input 
              type="text" 
              placeholder="Search for products, brands and more"
              className="search-input"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyPress}
              onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
            />
            <button className="filter-sort-btn" onClick={() => setShowFilters(!showFilters)}>⚙️</button>
            <button className="search-btn" onClick={handleSearchClick}>🔍</button>
            
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
              <div className="search-filters">
                <div className="filter-header">
                  <h4>Filter & Sort</h4>
                  <button className="close-filters" onClick={() => setShowFilters(false)}>×</button>
                </div>
                <div className="filter-row">
                  <div className="filter-group">
                    <label>Sort by:</label>
                    <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); }} className="filter-select">
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Rating</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label>Rating:</label>
                    <select value={ratingFilter} onChange={(e) => { setRatingFilter(parseFloat(e.target.value)); }} className="filter-select">
                      <option value={0}>All Ratings</option>
                      <option value={4}>4⭐ & above</option>
                      <option value={3}>3⭐ & above</option>
                      <option value={2}>2⭐ & above</option>
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label>Price: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="50000" 
                      value={priceRange[1]} 
                      onChange={(e) => { setPriceRange([priceRange[0], parseInt(e.target.value)]); }}
                      className="price-slider"
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label>Brands:</label>
                    <div className="brand-filters">
                      {availableBrands.slice(0, 3).map(brand => (
                        <label key={brand} className="brand-checkbox">
                          <input 
                            type="checkbox" 
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandToggle(brand)}
                          />
                          {brand}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <button className="clear-filters" onClick={clearAllFilters}>Clear All</button>
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
            <div className="account-dropdown" ref={dropdownRef}>
              <button 
                className="account-btn"
                onClick={() => setShowAccountMenu(!showAccountMenu)}
              >
                <span className="account-icon">👤</span>
                <span>Account</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              {showAccountMenu && (
                <div className="account-menu">
                  <div className="account-header">
                    <span className="user-icon">👤</span>
                    <div>
                      <div className="user-name">Hello {getUserName()}</div>
                      <div className="user-email">{currentUser?.contact || 'user@example.com'}</div>
                    </div>
                  </div>
                  <div className="menu-divider"></div>
                  <ul className="account-options">
                    <li><Link to="/orders">📦 My Orders</Link></li>
                    <li><Link to="/wishlist">❤️ Wishlist</Link></li>
                    <li><Link to="/coupons">🎫 Coupons</Link></li>
                    <li><Link to="/rewards">🎁 Rewards</Link></li>
                    <li><Link to="/profile">⚙️ Account Settings</Link></li>
                    <li><Link to="/support">❓ Customer Care</Link></li>
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
            <Link to="/" className="nav-link">Home</Link>
            <div className="dropdown">
              <span className="nav-link">Men ▼</span>
              <div className="dropdown-content">
                <span onClick={() => onCategoryFilter('men', 'shirt')}>Shirts</span>
                <span onClick={() => onCategoryFilter('men', 'tshirt')}>T-Shirts</span>
                <span onClick={() => onCategoryFilter('men', 'jeans')}>Jeans</span>
                <span onClick={() => onCategoryFilter('men', 'shoes')}>Shoes</span>
              </div>
            </div>
            <div className="dropdown">
              <span className="nav-link">Women ▼</span>
              <div className="dropdown-content">
                <span onClick={() => onCategoryFilter('women', 'dress')}>Dresses</span>
                <span onClick={() => onCategoryFilter('women', 'top')}>Tops</span>
                <span onClick={() => onCategoryFilter('women', 'saree')}>Sarees</span>
                <span onClick={() => onCategoryFilter('women', 'footwear')}>Footwear</span>
              </div>
            </div>
            <span className="nav-link" onClick={() => onCategoryFilter('kids', 'all')}>Kids</span>
            <span className="nav-link" onClick={() => onCategoryFilter('electronics', 'all')}>Electronics</span>
            <Link to="/support" className="nav-link">Support</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;