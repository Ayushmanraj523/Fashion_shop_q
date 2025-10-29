import React, { useState } from 'react';
import '../styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose, setIsLoggedIn, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const user = { email, name: email.split('@')[0] };
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      setIsLoggedIn(true);
      onClose();
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Login Required</h2>
        <p>Please login to add items to cart</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;