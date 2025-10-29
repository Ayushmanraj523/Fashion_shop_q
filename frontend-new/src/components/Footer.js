import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Fashion Shop</h3>
          <p>Your one-stop destination for fashion and lifestyle products.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/orders">Orders</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><a href="/">Men</a></li>
            <li><a href="/">Women</a></li>
            <li><a href="/">Kids</a></li>
            <li><a href="/">Electronics</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 <a href="mailto:ayushmanraj927@gmail.com">ayushmanraj927@gmail.com</a></p>
          <p>📞 <a href="tel:+918987818616">+91 8987818616</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Fashion Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;