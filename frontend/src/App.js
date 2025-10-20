import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import CustomerSupport from './pages/CustomerSupport';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Coupons from './pages/Coupons';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState({ category: 'all', subCategory: 'all', brand: null });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const addToCart = (product) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setCartItems([...cartItems, { ...product, id: Date.now() }]);
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCategoryFilter = (category, subCategory, brand = null) => {
    setCategoryFilter({ category, subCategory, brand });
    setSearchQuery('');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCategoryFilter({ category: 'all', subCategory: 'all', brand: null });
  };

  const handleHomeNavigation = () => {
    setSearchQuery('');
    setCategoryFilter({ category: 'all', subCategory: 'all', brand: null });
    setSortBy('relevance');
    setPriceRange([0, 50000]);
    setSelectedBrands([]);
    setRatingFilter(0);
  };

  return (
    <Router>
      <div className="App">
        <Navbar cartCount={cartItems.length} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} onCategoryFilter={handleCategoryFilter} onSearch={handleSearch} onHomeNavigation={handleHomeNavigation} sortBy={sortBy} setSortBy={setSortBy} priceRange={priceRange} setPriceRange={setPriceRange} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} ratingFilter={ratingFilter} setRatingFilter={setRatingFilter} />
        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} isLoggedIn={isLoggedIn} setShowLoginModal={setShowLoginModal} searchQuery={searchQuery} setSearchQuery={setSearchQuery} sortBy={sortBy} setSortBy={setSortBy} priceRange={priceRange} setPriceRange={setPriceRange} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} ratingFilter={ratingFilter} setRatingFilter={setRatingFilter} />} />
          <Route path="/products" element={<ProductsPage addToCart={addToCart} isLoggedIn={isLoggedIn} setShowLoginModal={setShowLoginModal} />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="/support" element={<CustomerSupport />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} currentUser={currentUser} clearCart={clearCart} />} />
        </Routes>
        
        <Footer />
        
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)}
          setIsLoggedIn={setIsLoggedIn}
          setCurrentUser={setCurrentUser}
        />
      </div>
    </Router>
  );
}

export default App;