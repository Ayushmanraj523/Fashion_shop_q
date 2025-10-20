import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn, setCurrentUser }) => {
  const navigate = useNavigate();
  const [contactType, setContactType] = useState('email');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (showOTP) {
      // Verify OTP (simplified - in real app, verify with backend)
      if (otp === '123456') {
        const user = {
          name: name || contact.split('@')[0] || 'User',
          contact: contact
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        alert('Invalid OTP. Please try 123456');
      }
    } else {
      // For demo purposes, any email/phone with password works
      if (contact && password) {
        setShowOTP(true);
        alert('OTP sent! Use 123456 to login');
      } else {
        alert('Please fill in all fields');
      }
    }
  };

  const handleBackToLogin = () => {
    setShowOTP(false);
    setOtp('');
  };

  const handleResendOTP = () => {
    alert('OTP resent! Use 123456 to login');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {!showOTP ? (
          <>
            <h2>Login to Fashion Shop</h2>
            
            <div className="demo-credentials">
              <h4>Demo Login Credentials:</h4>
              <p><strong>Email:</strong> demo@fashionshop.com</p>
              <p><strong>Password:</strong> demo123</p>
              <p><strong>OTP:</strong> 123456</p>
            </div>
            
            <div className="contact-type-selector">
              <button 
                className={`type-btn ${contactType === 'email' ? 'active' : ''}`}
                onClick={() => setContactType('email')}
              >
                Email
              </button>
              <button 
                className={`type-btn ${contactType === 'phone' ? 'active' : ''}`}
                onClick={() => setContactType('phone')}
              >
                Phone
              </button>
            </div>

            <form onSubmit={handleLogin}>
              <button 
                type="button" 
                className="demo-fill-btn"
                onClick={() => {
                  setContact('demo@fashionshop.com');
                  setPassword('demo123');
                }}
              >
                Use Demo Credentials
              </button>
              
              <div className="form-group">
                <label>{contactType === 'email' ? 'Email Address' : 'Phone Number'}</label>
                <input
                  type={contactType === 'email' ? 'email' : 'tel'}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={contactType === 'email' ? 'demo@fashionshop.com' : '9876543210'}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="demo123"
                  required
                />
              </div>

              <button type="submit" className="login-button">
                Continue
              </button>
            </form>

            <p className="signup-link">
              New to Fashion Shop? <Link to="/signup">Create an account</Link>
            </p>
          </>
        ) : (
          <>
            <h2>Verify OTP</h2>
            <p>We've sent a verification code to {contact}</p>
            <div className="otp-hint">
              <p><strong>Demo OTP:</strong> 123456</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength="6"
                  required
                />
              </div>

              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <button type="submit" className="login-button">
                Verify & Login
              </button>
            </form>

            <div className="otp-actions">
              <button className="resend-btn" onClick={handleResendOTP}>
                Resend OTP
              </button>
              <button className="back-btn" onClick={handleBackToLogin}>
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;