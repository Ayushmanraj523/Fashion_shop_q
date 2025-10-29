import React, { useState, useEffect, useRef } from 'react';

const LiveChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you today?", sender: 'bot', time: new Date().toLocaleTimeString() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const botResponses = {
    'hello': 'Hello! Welcome to Fashion Shop. How can I assist you today?',
    'hi': 'Hi there! What can I help you with today?',
    'order': 'You can track your orders in the Orders section. Need help with a specific order ID?',
    'track': 'To track your order: Go to Orders → Enter your order ID. Orders typically arrive in 3-5 days.',
    'return': 'We offer 30-day easy returns. Items must be unused with tags. Would you like to initiate a return?',
    'refund': 'Refunds are processed within 5-7 business days after we receive your returned item.',
    'exchange': 'You can exchange items within 30 days. Size exchanges are free, color exchanges may have charges.',
    'shipping': 'Free shipping on orders above ₹999. Standard delivery: 3-5 days, Express: 1-2 days.',
    'delivery': 'Delivery times: Metro cities 2-3 days, Other cities 4-5 days. We deliver Monday-Saturday.',
    'payment': 'We accept Credit/Debit cards, UPI, Net Banking, Wallets, and Cash on Delivery.',
    'cod': 'Cash on Delivery available for orders up to ₹50,000. COD charges: ₹40 for orders below ₹999.',
    'size': 'Check our size guide on each product page. For help with sizing, share your measurements.',
    'discount': 'Current offers: Up to 70% off on fashion items. Use code SAVE20 for extra 20% off!',
    'coupon': 'Active coupons: SAVE20 (20% off), FIRST10 (10% off first order), FREE99 (free shipping)',
    'cancel': 'You can cancel orders within 24 hours if not shipped. Go to Orders → Cancel Order.',
    'account': 'Having account issues? Try resetting your password or contact us for help.',
    'login': 'Login issues? Use Forgot Password or try logging in with your phone number.',
    'wishlist': 'Add items to wishlist by clicking the heart icon. Access it from your account menu.',
    'cart': 'Items in cart are saved for 30 days. Having trouble with checkout? Clear cache and try again.',
    'quality': 'We guarantee 100% authentic products. If you receive damaged items, we offer free replacement.',
    'warranty': 'Electronics come with manufacturer warranty. Fashion items have quality guarantee.',
    'bulk': 'For bulk orders (50+ items), contact us at ayushmanraj927@gmail.com for special pricing.',
    'gift': 'Gift wrapping available for ₹50. Add gift message during checkout.',
    'contact': 'Reach us: Email: ayushmanraj927@gmail.com | Phone: +91 8987818616 | Hours: 9AM-8PM',
    'hours': 'Customer support hours: Monday-Saturday 9AM-8PM, Sunday 10AM-6PM',
    'complaint': 'For complaints, email us with your order details. We resolve issues within 24-48 hours.',
    'default': 'I understand your concern. Our team will help you shortly. Email: ayushmanraj927@gmail.com or call +91 8987818616'
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    return botResponses.default;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        time: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="live-chat-overlay">
      <div className="live-chat-container glass-card">
        <div className="chat-header">
          <h3>Live Chat Support</h3>
          <button onClick={onClose} className="close-chat">×</button>
        </div>
        
        <div className="chat-messages">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chat-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage} className="send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;