import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
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
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import { ROUTES } from './constants';
import './styles/App.css';
import './styles/modern.css';
import './styles/LiveChat.css';
import './styles/LoginModal.css';

function App() {
  const { isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser } = useAuth();
  const { cartItems, addToCart, removeFromCart, clearCart, cartCount } = useCart();
  const [categoryFilter, setCategoryFilter] = useState({ category: 'all', subCategory: 'all', brand: null });
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    addToCart(product);
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
      <ErrorBoundary>
        <div className="App">
          <Navbar 
            cartCount={cartCount} 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn} 
            currentUser={currentUser} 
            onCategoryFilter={handleCategoryFilter} 
            onSearch={handleSearch} 
            onHomeNavigation={handleHomeNavigation} 
            sortBy={sortBy} 
            setSortBy={setSortBy} 
            priceRange={priceRange} 
            setPriceRange={setPriceRange} 
            selectedBrands={selectedBrands} 
            setSelectedBrands={setSelectedBrands} 
            ratingFilter={ratingFilter} 
            setRatingFilter={setRatingFilter} 
          />
          <Routes>
            <Route path={ROUTES.HOME} element={
              <HomePage 
                addToCart={handleAddToCart} 
                categoryFilter={categoryFilter} 
                setCategoryFilter={setCategoryFilter} 
                isLoggedIn={isLoggedIn} 
                setShowLoginModal={setShowLoginModal} 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                sortBy={sortBy} 
                setSortBy={setSortBy} 
                priceRange={priceRange} 
                setPriceRange={setPriceRange} 
                selectedBrands={selectedBrands} 
                setSelectedBrands={setSelectedBrands} 
                ratingFilter={ratingFilter} 
                setRatingFilter={setRatingFilter} 
              />
            } />
            <Route path={ROUTES.PRODUCTS} element={<ProductsPage addToCart={handleAddToCart} isLoggedIn={isLoggedIn} setShowLoginModal={setShowLoginModal} />} />
            <Route path={ROUTES.LOGIN} element={<Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
            <Route path={ROUTES.SIGNUP} element={<Signup setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
            <Route path={ROUTES.CART} element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
            <Route path={ROUTES.SUPPORT} element={<CustomerSupport />} />
            <Route path={ROUTES.ORDERS} element={<Orders />} />
            <Route path={ROUTES.WISHLIST} element={<Wishlist />} />
            <Route path={ROUTES.COUPONS} element={<Coupons />} />
            <Route path={ROUTES.REWARDS} element={<Rewards />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.CHECKOUT} element={<Checkout cartItems={cartItems} currentUser={currentUser} clearCart={clearCart} />} />
          </Routes>
          
          <Footer />
          
          <LoginModal 
            isOpen={showLoginModal} 
            onClose={() => setShowLoginModal(false)}
            setIsLoggedIn={setIsLoggedIn}
            setCurrentUser={setCurrentUser}
          />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;