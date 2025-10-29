import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = ({ setIsLoggedIn, setCurrentUser }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password) {
      setError('Please fill in all fields');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
      setError('Phone number must be exactly 10 digits');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8084';
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStep(2);
        setError('OTP sent to your email and phone number!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Registration failed');
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8084';
      const response = await fetch(`${apiUrl}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ 
          emailOrPhone: formData.email, 
          otp 
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        const userData = { name: formData.name, email: formData.email };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setCurrentUser(userData);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'OTP verification failed');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8084';
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setError('OTP resent successfully!');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to resend OTP');
      }
    } catch (error) {
      setError('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="login-page">
        <h2>Create Account</h2>
        
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Create Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password (min 6 characters)"
              minLength="6"
              required
            />
          </div>
          
          {error && (
            <div className={`error-message ${error.includes('successfully') ? 'success' : 'error'}`}>
              {error}
            </div>
          )}
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
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
        Enter the OTP sent to your email and phone number
      </p>
      
      <form onSubmit={handleVerifyOtp}>
        <div className="form-group">
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit OTP"
            pattern="[0-9]{6}"
            maxLength="6"
            required
          />
        </div>
        
        {error && (
          <div className={`error-message ${error.includes('successfully') ? 'success' : 'error'}`}>
            {error}
          </div>
        )}
        
        <button type="submit" className="login-button" disabled={loading || otp.length !== 6}>
          {loading ? 'Verifying...' : 'Verify & Create Account'}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button 
          type="button" 
          className="resend-btn"
          onClick={handleResendOtp}
          disabled={loading}
        >
          Resend OTP
        </button>
        <br/>
        <button 
          type="button" 
          className="back-btn"
          onClick={() => { setStep(1); setError(''); }}
          style={{ marginTop: '0.5rem' }}
        >
          Back to Registration
        </button>
      </div>
    </div>
  );
};

export default Signup;