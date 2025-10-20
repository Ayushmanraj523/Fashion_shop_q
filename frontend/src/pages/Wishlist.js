import React from 'react';

const Wishlist = () => {
  return (
    <div className="empty-page">
      <div className="empty-content">
        <div className="empty-icon">❤️</div>
        <h2>Your Wishlist is Empty</h2>
        <p>Save your favorite items to wishlist and shop them later!</p>
        <button className="cta-button" onClick={() => window.location.href = '/'}>
          Browse Products
        </button>
      </div>
    </div>
  );
};

export default Wishlist;