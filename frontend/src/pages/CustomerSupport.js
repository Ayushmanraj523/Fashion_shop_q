import React, { useState } from 'react';

const CustomerSupport = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      alert('Thank you for contacting us! We will get back to you soon.');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="support-page">
      <h2>Customer Support</h2>
      
      <div className="support-options">
        <div className="support-card">
          <h3>📞 Call Us</h3>
          <p><strong>+91 1800-FASHION</strong></p>
          <p>Mon-Sat: 9AM-8PM</p>
          <p>Sunday: 10AM-6PM</p>
        </div>
        
        <div className="support-card">
          <h3>📧 Email Support</h3>
          <p><strong>support@fashionshop.in</strong></p>
          <p>Response within 2-4 hours</p>
          <p>24/7 Email Support</p>
        </div>
        
        <div className="support-card">
          <h3>💬 Live Chat</h3>
          <p><strong>Instant Support</strong></p>
          <p>Available 24/7</p>
          <button className="cta-button" style={{marginTop: '1rem'}}>Start Chat Now</button>
        </div>
      </div>
      
      <div className="contact-form">
        <h3>Send us a Message</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="support-name">Name:</label>
            <input
              type="text"
              id="support-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="support-email">Email:</label>
            <input
              type="email"
              id="support-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="support-message">Message:</label>
            <textarea
              id="support-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you?"
              required
            />
          </div>
          
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerSupport;