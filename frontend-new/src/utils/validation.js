// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const validateOTP = (otp) => {
  return otp && otp.length === 6 && /^\d+$/.test(otp);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};