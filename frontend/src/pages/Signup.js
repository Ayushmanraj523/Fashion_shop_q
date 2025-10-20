import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setIsLoggedIn, setCurrentUser }) => {
  const [step, setStep] = useState(1);
  const [contactType, setContactType] = useState('email');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    password: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const validateForm = () => {
    if (!formData.name || !formData.contact || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
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

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const newOtp = generateOtp();
    setGeneratedOtp(newOtp);
    alert(`OTP sent to your ${contactType}: ${newOtp}`);
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      const userData = {
        name: formData.name,
        contact: formData.contact,
        contactType: contactType
      };
      setCurrentUser(userData);
      setIsLoggedIn(true);
      alert('Account created successfully!');
      navigate('/');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  if (step === 1) {
    return (
      <div className="login-page">
        <h2>Create Account</h2>
        
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
        
        <form onSubmit={handleSendOtp}>
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          
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
              placeholder="Create a password"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Send OTP
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
          Already have an account? <a href="/login" style={{ color: '#2c3e50' }}>Login</a>
        </p>
      </div>
    );
  }

  return (
    <div className="login-page">
      <h2>Verify OTP</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
        Enter the OTP sent to your {contactType}: {formData.contact}
      </p>
      
      <form onSubmit={handleVerifyOtp}>
        <div className="form-group">
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            pattern="[0-9]{6}"
            maxLength="6"
            required
          />
        </div>
        
        <button type="submit" className="login-button">
          Verify & Create Account
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button 
          type="button" 
          className="resend-btn"
          onClick={() => {
            const newOtp = generateOtp();
            setGeneratedOtp(newOtp);
            alert(`New OTP sent: ${newOtp}`);
          }}
        >
          Resend OTP
        </button>
        <br/>
        <button 
          type="button" 
          className="back-btn"
          onClick={() => setStep(1)}
          style={{ marginTop: '0.5rem' }}
        >
          Back to Registration
        </button>
      </div>
    </div>
  );
};

export default Signup;