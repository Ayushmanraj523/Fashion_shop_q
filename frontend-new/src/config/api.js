const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8084';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    VERIFY_OTP: `${API_BASE_URL}/api/auth/verify-otp`,
    VERIFY_LOGIN_OTP: `${API_BASE_URL}/api/auth/verify-login-otp`,
    REQUEST_OTP: `${API_BASE_URL}/api/auth/request-otp`,
    HEALTH: `${API_BASE_URL}/api/auth/health`
  }
};

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
};