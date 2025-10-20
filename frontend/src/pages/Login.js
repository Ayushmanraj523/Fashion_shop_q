import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setCurrentUser }) => {
  const [contactType, setContactType] = useState('email');
  const [formData, setFormData] = useState({
    contact: '',
    password: ''
  });
  const navigate = useNavigate();
  
  // Mock user database (in real app, this would be in backend)
  const mockUsers = [
    { name: 'John Doe', contact: 'john.doe@gmail.com', password: 'password123', contactType: 'email' },
    { name: 'Priya Sharma', contact: '9876543210', password: 'password123', contactType: 'phone' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateLogin = () => {
    if (!formData.contact || !formData.password) {
      alert('Please fill in all fields');
      return false;
    }
    if (contactType === 'phone' && !/^[0-9]{10}$/.test(formData.contact)) {
      alert('Phone number must be exactly 10 digits');
      return false;
    }
    if (contactType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact)) {
      alert('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    
    // Check if user exists with correct password
    const user = mockUsers.find(u => u.contact === formData.contact);
    if (user && user.password === formData.password) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      alert('Login successful!');
      navigate('/');
    } else {
      alert('Invalid credentials. Please check your details.');
    }
  };

  return (
    <div className="login-page">
      <h2>Login to Fashion Shop</h2>
      
      <div className="contact-type-selector">
        <button 
          type="button"
          className={`type-btn ${contactType === 'email' ? 'active' : ''}`}
          onClick={() => setContactType('email')}
        >
          Email
        </button>
        <button 
          type="button"
          className={`type-btn ${contactType === 'phone' ? 'active' : ''}`}
          onClick={() => setContactType('phone')}
        >
          Phone
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contact">
            {contactType === 'email' ? 'Email:' : 'Phone Number:'}
          </label>
          <input
            type={contactType === 'email' ? 'email' : 'tel'}
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder={contactType === 'email' ? 'Enter your email' : 'Enter 10-digit phone number'}
            pattern={contactType === 'phone' ? '[0-9]{10}' : undefined}
            maxLength={contactType === 'phone' ? '10' : undefined}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
        Don't have an account? <a href="/signup" style={{ color: '#2c3e50' }}>Sign up</a>
      </p>
      
      <div style={{ textAlign: 'center', marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: '#2c3e50' }}>Demo Credentials:</p>
        <p style={{ margin: '0.2rem 0', fontSize: '0.85rem', color: '#666' }}>Email: john.doe@gmail.com</p>
        <p style={{ margin: '0.2rem 0', fontSize: '0.85rem', color: '#666' }}>Phone: 9876543210</p>
        <p style={{ margin: '0.2rem 0', fontSize: '0.85rem', color: '#666' }}>Password: password123</p>
      </div>
    </div>
  );
};

export default Login;