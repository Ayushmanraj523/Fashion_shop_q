import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.cartId || item.id || item.name]: 1 }), {})
  );

  const updateItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setQuantities(prev => ({ ...prev, [itemId]: newQuantity }));
  };

  const calculateItemTotal = (item) => {
    const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
    return price * (quantities[item.cartId || item.id || item.name] || 1);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const calculateGST = () => {
    const subtotal = calculateSubtotal();
    return Math.round(subtotal * 0.18); // 18% GST
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 999 ? 0 : 99;
    const gst = calculateGST();
    return subtotal + shipping + gst;
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <h1>Shopping Bag</h1>
          <p>0 items</p>
        </div>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛍️</div>
          <h2>Your bag is empty</h2>
          <p>Looks like you haven't added anything to your bag yet</p>
          <button className="continue-shopping" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Bag</h1>
        <p>{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</p>
      </div>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.cartId || item.id || item.name} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <div className="item-meta">
                  <span className="size">Size: M</span>
                  <span className="color">Color: Default</span>
                </div>
                <div className="item-price">
                  <span className="current-price">{item.price}</span>
                  {item.originalPrice && (
                    <span className="original-price">{item.originalPrice}</span>
                  )}
                </div>
                <div className="delivery-info">
                  <span>🚚 Delivery by tomorrow</span>
                </div>
              </div>
              
              <div className="item-controls">
                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => updateItemQuantity(item.cartId || item.id || item.name, (quantities[item.cartId || item.id || item.name] || 1) - 1)}
                  >
                    -
                  </button>
                  <span className="quantity">{quantities[item.cartId || item.id || item.name] || 1}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => updateItemQuantity(item.cartId || item.id || item.name, (quantities[item.cartId || item.id || item.name] || 1) + 1)}
                  >
                    +
                  </button>
                </div>
                
                <div className="item-actions">
                  <button className="wishlist-btn">♡ Wishlist</button>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.cartId || item.id || item.name)}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{calculateSubtotal().toLocaleString('en-IN')}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>{calculateSubtotal() > 999 ? 'FREE' : '₹99'}</span>
            </div>
            
            <div className="summary-row">
              <span>GST (18%)</span>
              <span>₹{calculateGST().toLocaleString('en-IN')}</span>
            </div>
            
            {calculateSubtotal() < 999 && (
              <div className="shipping-notice">
                <p>Add ₹{(999 - calculateSubtotal()).toLocaleString('en-IN')} more for FREE shipping</p>
              </div>
            )}
            
            <div className="summary-total">
              <span>Total</span>
              <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
            </div>
            
            <div className="promo-code">
              <input type="text" placeholder="Enter promo code" />
              <button>Apply</button>
            </div>
            
            <button 
              className="checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
            
            <div className="payment-options">
              <p>We accept:</p>
              <div className="payment-icons">
                <span>💳</span>
                <span>📱</span>
                <span>💰</span>
              </div>
            </div>
          </div>
          
          <div className="benefits">
            <div className="benefit">
              <span>🚚</span>
              <div>
                <strong>Free Shipping</strong>
                <p>On orders above ₹999</p>
              </div>
            </div>
            <div className="benefit">
              <span>🔄</span>
              <div>
                <strong>Easy Returns</strong>
                <p>30-day return policy</p>
              </div>
            </div>
            <div className="benefit">
              <span>🛡️</span>
              <div>
                <strong>Secure Payment</strong>
                <p>100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;