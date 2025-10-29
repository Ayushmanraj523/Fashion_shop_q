import React, { useState } from 'react';

const Coupons = () => {
  const [copiedCode, setCopiedCode] = useState('');

  const availableCoupons = [
    {
      id: 1,
      code: 'WELCOME50',
      title: 'Welcome Offer',
      description: 'Get 50% off on your first order',
      discount: '50% OFF',
      minOrder: 999,
      maxDiscount: 500,
      validTill: '31 Dec 2024',
      type: 'first-order',
      color: 'gradient-red'
    },
    {
      id: 2,
      code: 'FASHION30',
      title: 'Fashion Sale',
      description: 'Flat 30% off on all fashion items',
      discount: '30% OFF',
      minOrder: 1499,
      maxDiscount: 1000,
      validTill: '25 Dec 2024',
      type: 'category',
      color: 'gradient-blue'
    },
    {
      id: 3,
      code: 'MEGA70',
      title: 'Mega Sale',
      description: 'Up to 70% off on selected items',
      discount: 'UP TO 70% OFF',
      minOrder: 2999,
      maxDiscount: 2000,
      validTill: '20 Dec 2024',
      type: 'sale',
      color: 'gradient-green'
    },
    {
      id: 4,
      code: 'FREESHIP',
      title: 'Free Shipping',
      description: 'Free delivery on all orders',
      discount: 'FREE DELIVERY',
      minOrder: 499,
      maxDiscount: 99,
      validTill: '31 Dec 2024',
      type: 'shipping',
      color: 'gradient-purple'
    },
    {
      id: 5,
      code: 'WINTER25',
      title: 'Winter Collection',
      description: '25% off on winter wear',
      discount: '25% OFF',
      minOrder: 1999,
      maxDiscount: 800,
      validTill: '15 Jan 2025',
      type: 'seasonal',
      color: 'gradient-orange'
    },
    {
      id: 6,
      code: 'NEWUSER40',
      title: 'New User Special',
      description: '40% off for new customers',
      discount: '40% OFF',
      minOrder: 1299,
      maxDiscount: 600,
      validTill: '28 Dec 2024',
      type: 'new-user',
      color: 'gradient-pink'
    }
  ];

  const expiredCoupons = [
    {
      id: 7,
      code: 'DIWALI50',
      title: 'Diwali Special',
      description: 'Festival offer - 50% off',
      discount: '50% OFF',
      validTill: '15 Nov 2024',
      expired: true
    },
    {
      id: 8,
      code: 'BLACKFRIDAY',
      title: 'Black Friday Sale',
      description: 'Biggest sale of the year',
      discount: '60% OFF',
      validTill: '30 Nov 2024',
      expired: true
    }
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="coupons-page">
      <div className="coupons-header">
        <h1>My Coupons & Offers</h1>
        <p>Save more with exclusive deals and discounts</p>
      </div>

      <div className="coupons-stats">
        <div className="stat-card">
          <div className="stat-number">{availableCoupons.length}</div>
          <div className="stat-label">Available Coupons</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">₹5,000</div>
          <div className="stat-label">Total Savings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">12</div>
          <div className="stat-label">Coupons Used</div>
        </div>
      </div>

      <div className="coupons-section">
        <h2>Available Coupons</h2>
        <div className="coupons-grid">
          {availableCoupons.map((coupon) => (
            <div key={coupon.id} className={`coupon-card ${coupon.color}`}>
              <div className="coupon-header">
                <div className="coupon-discount">{coupon.discount}</div>
                <div className="coupon-type">{coupon.type.replace('-', ' ').toUpperCase()}</div>
              </div>
              
              <div className="coupon-content">
                <h3>{coupon.title}</h3>
                <p>{coupon.description}</p>
                
                <div className="coupon-details">
                  <div className="detail-item">
                    <span className="label">Min Order:</span>
                    <span className="value">₹{coupon.minOrder.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Max Discount:</span>
                    <span className="value">₹{coupon.maxDiscount}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Valid Till:</span>
                    <span className="value">{coupon.validTill}</span>
                  </div>
                </div>
              </div>
              
              <div className="coupon-footer">
                <div className="coupon-code">
                  <span>Code: {coupon.code}</span>
                </div>
                <button 
                  className="copy-btn"
                  onClick={() => copyToClipboard(coupon.code)}
                >
                  {copiedCode === coupon.code ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="expired-section">
        <h2>Expired Coupons</h2>
        <div className="expired-coupons">
          {expiredCoupons.map((coupon) => (
            <div key={coupon.id} className="expired-coupon">
              <div className="expired-content">
                <h4>{coupon.title}</h4>
                <p>{coupon.description}</p>
                <span className="expired-code">Code: {coupon.code}</span>
              </div>
              <div className="expired-badge">
                <span>EXPIRED</span>
                <small>{coupon.validTill}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="coupon-tips">
        <h3>💡 How to use coupons?</h3>
        <div className="tips-grid">
          <div className="tip">
            <span className="tip-number">1</span>
            <div>
              <strong>Shop & Add to Cart</strong>
              <p>Add your favorite items to cart</p>
            </div>
          </div>
          <div className="tip">
            <span className="tip-number">2</span>
            <div>
              <strong>Apply Coupon Code</strong>
              <p>Enter coupon code at checkout</p>
            </div>
          </div>
          <div className="tip">
            <span className="tip-number">3</span>
            <div>
              <strong>Enjoy Savings</strong>
              <p>Get instant discount on your order</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;