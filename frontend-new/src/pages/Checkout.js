import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Checkout = ({ cartItems, currentUser, clearCart }) => {
  const location = useLocation();
  const buyNowItem = location.state?.buyNowItem;
  const itemsToShow = buyNowItem ? [buyNowItem] : cartItems;
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    email: currentUser?.contact || '',
    firstName: currentUser?.name?.split(' ')[0] || '',
    lastName: currentUser?.name?.split(' ')[1] || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
    upiId: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const navigate = useNavigate();

  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    // Remove ₹ symbol and all commas, then parse
    const cleanPrice = priceString.toString().replace('₹', '').replace(/,/g, '');
    const numericPrice = parseFloat(cleanPrice);
    console.log('Price parsing:', priceString, '->', cleanPrice, '->', numericPrice);
    return isNaN(numericPrice) ? 0 : numericPrice;
  };

  const calculateSubtotal = () => {
    if (!itemsToShow || itemsToShow.length === 0) return 0;
    const subtotal = itemsToShow.reduce((total, item) => {
      const itemPrice = parsePrice(item.price);
      console.log('Adding item:', item.name, 'price:', itemPrice, 'running total:', total + itemPrice);
      return total + itemPrice;
    }, 0);
    console.log('Final subtotal:', subtotal);
    return subtotal;
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 400 ? 0 : 99;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return Math.round(subtotal * 0.18);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const tax = calculateTax();
    return subtotal + shipping + tax;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 8); // 7-10 days (using 8 as average)
    
    const orderData = {
      id: Date.now(),
      items: itemsToShow,
      total: calculateTotal(),
      subtotal: calculateSubtotal(),
      shipping: calculateShipping(),
      tax: calculateTax(),
      paymentMethod: formData.paymentMethod,
      address: formData,
      date: new Date().toLocaleDateString('en-IN'),
      status: 'Confirmed',
      estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric', 
        month: 'short',
        year: 'numeric'
      })
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    clearCart();
    setOrderPlaced(true);
    
    setTimeout(() => {
      navigate('/orders');
    }, 4000);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <div className="success-content">
          <div className="success-animation">
            <div className="checkmark">✓</div>
          </div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with Fashion Shop</p>
          <div className="order-details">
            <p>Order Total: <strong>₹{calculateTotal().toLocaleString('en-IN')}</strong></p>
            <p>Payment Method: <strong>{formData.paymentMethod === 'cod' ? 'Cash on Delivery' : formData.paymentMethod.toUpperCase()}</strong></p>
            <p>Expected Delivery: <strong>{new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} (7-10 days)</strong></p>
          </div>
          <div className="success-actions">
            <button onClick={() => navigate('/orders')} className="view-orders-btn">
              View My Orders
            </button>
            <button onClick={() => navigate('/')} className="continue-shopping-btn">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!itemsToShow || itemsToShow.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h2>No items to checkout</h2>
          <p>Add some items to your cart to proceed with checkout.</p>
          <button onClick={() => navigate('/')} className="continue-shopping">Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Secure Checkout</h1>
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Information</p>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span>2</span>
            <p>Payment</p>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <span>3</span>
            <p>Review</p>
          </div>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-form">
          {step === 1 && (
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-row">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="email"
                />
              </div>
              
              <h3>Shipping Address</h3>
              <div className="form-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  autoComplete="given-name"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  autoComplete="family-name"
                />
              </div>
              
              <div className="form-row">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  autoComplete="tel"
                />
              </div>
              
              <div className="form-row">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  autoComplete="street-address"
                />
              </div>
              
              <div className="form-row">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  autoComplete="address-level2"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  autoComplete="address-level1"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="PIN code"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  pattern="[0-9]{6}"
                  required
                  autoComplete="postal-code"
                />
              </div>
              
              <button 
                className="continue-btn" 
                onClick={() => {
                  if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode || !formData.email) {
                    alert('Please fill in all required fields');
                    return;
                  }
                  if (!/^[0-9]{6}$/.test(formData.pincode)) {
                    alert('Please enter a valid 6-digit PIN code');
                    return;
                  }
                  if (!/^[0-9]{10}$/.test(formData.phone)) {
                    alert('Please enter a valid 10-digit phone number');
                    return;
                  }
                  setStep(2);
                }}
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-section">
              <h3>Payment Method</h3>
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-info">
                    <strong>Cash on Delivery</strong>
                    <p>Pay when your order arrives</p>
                  </div>
                  <span className="payment-icon">💰</span>
                </label>
                
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-info">
                    <strong>UPI Payment</strong>
                    <p>Pay using Google Pay, PhonePe, Paytm</p>
                  </div>
                  <span className="payment-icon">📱</span>
                </label>
                
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-info">
                    <strong>Credit/Debit Card</strong>
                    <p>Visa, Mastercard, RuPay accepted</p>
                  </div>
                  <span className="payment-icon">💳</span>
                </label>
              </div>
              
              {formData.paymentMethod === 'upi' && (
                <div className="payment-details">
                  <h4>UPI Details</h4>
                  <div className="form-row">
                    <input
                      type="text"
                      name="upiId"
                      placeholder="Enter UPI ID (e.g., user@paytm)"
                      value={formData.upiId || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}
              
              {formData.paymentMethod === 'card' && (
                <div className="payment-details">
                  <h4>Card Details</h4>
                  <div className="form-row">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number (1234 5678 9012 3456)"
                      value={formData.cardNumber || ''}
                      onChange={handleInputChange}
                      maxLength="19"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="text"
                      name="cardName"
                      placeholder="Cardholder Name"
                      value={formData.cardName || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate || ''}
                      onChange={handleInputChange}
                      maxLength="5"
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv || ''}
                      onChange={handleInputChange}
                      maxLength="3"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="step-actions">
                <button className="back-btn" onClick={() => setStep(1)}>
                  Back to Information
                </button>
                <button 
                  className="continue-btn" 
                  onClick={() => {
                    if (formData.paymentMethod === 'upi' && !formData.upiId) {
                      alert('Please enter your UPI ID');
                      return;
                    }
                    if (formData.paymentMethod === 'card') {
                      if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
                        alert('Please fill in all card details');
                        return;
                      }
                      if (!/^[0-9\s]{13,19}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
                        alert('Please enter a valid card number');
                        return;
                      }
                    }
                    setStep(3);
                  }}
                >
                  Review Order
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-section">
              <h3>Order Review</h3>
              <div className="review-section">
                <div className="review-items">
                  {itemsToShow.map((item, index) => (
                    <div key={index} className="review-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>Qty: 1</p>
                      </div>
                      <span className="item-price" style={{fontWeight: '600', color: '#212529'}}>{item.price}</span>
                    </div>
                  ))}
                </div>
                
                <div className="review-address">
                  <h4>Shipping Address</h4>
                  <p>{formData.firstName} {formData.lastName}</p>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.state} {formData.pincode}</p>
                  <p>{formData.phone}</p>
                </div>
                
                <div className="review-payment">
                  <h4>Payment Method</h4>
                  <p>{formData.paymentMethod === 'cod' ? 'Cash on Delivery' : formData.paymentMethod.toUpperCase()}</p>
                </div>
              </div>
              
              <div className="step-actions">
                <button className="back-btn" onClick={() => setStep(2)}>
                  Back to Payment
                </button>
                <button 
                  className="place-order-btn" 
                  onClick={() => {
                    if (window.confirm(`Confirm your order of ₹${calculateTotal().toLocaleString('en-IN')}?`)) {
                      handlePlaceOrder();
                    }
                  }}
                >
                  Place Order - ₹{calculateTotal().toLocaleString('en-IN')}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="order-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-items">
              {itemsToShow.map((item, index) => (
                <div key={index} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: 1</p>
                  </div>
                  <span style={{fontWeight: '600', color: '#212529'}}>{item.price}</span>
                </div>
              ))}
            </div>
            
            <div className="summary-calculations">
              <div className="calc-row">
                <span>Subtotal ({itemsToShow.length} items)</span>
                <span>₹{calculateSubtotal().toLocaleString('en-IN')}</span>
              </div>
              <div className="calc-row">
                <span>Shipping</span>
                <span>{calculateShipping() === 0 ? 'FREE' : `₹${calculateShipping()}`}</span>
              </div>
              <div className="calc-row">
                <span>Tax (18% GST)</span>
                <span>₹{calculateTax().toLocaleString('en-IN')}</span>
              </div>
              <div className="calc-total">
                <span>Total</span>
                <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <div className="security-badges">
              <div className="badge">
                <span>🔒</span>
                <p>Secure Checkout</p>
              </div>
              <div className="badge">
                <span>🚚</span>
                <p>Free Returns</p>
              </div>
              <div className="badge">
                <span>⭐</span>
                <p>Trusted Store</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;