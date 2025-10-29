package com.fashion.backend.util;

import java.util.regex.Pattern;

public class ValidationUtil {
    
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
    );
    
    private static final Pattern PHONE_PATTERN = Pattern.compile(
        "^(\\+91|91|0)?[6-9]\\d{9}$"
    );
    
    public static boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }
    
    public static boolean isValidPhoneNumber(String phoneNumber) {
        return phoneNumber != null && PHONE_PATTERN.matcher(phoneNumber).matches();
    }
    
    public static String formatPhoneNumber(String phoneNumber) {
        if (phoneNumber == null) return null;
        
        // Remove all non-digit characters except +
        String cleaned = phoneNumber.replaceAll("[^\\d+]", "");
        
        // Handle Indian phone numbers
        if (cleaned.startsWith("+91")) {
            return cleaned;
        } else if (cleaned.startsWith("91") && cleaned.length() == 12) {
            return "+" + cleaned;
        } else if (cleaned.startsWith("0") && cleaned.length() == 11) {
            return "+91" + cleaned.substring(1);
        } else if (cleaned.length() == 10 && cleaned.matches("[6-9]\\d{9}")) {
            return "+91" + cleaned;
        }
        
        return cleaned.startsWith("+") ? cleaned : "+" + cleaned;
    }
    
    public static boolean isEmailOrPhone(String input) {
        return isValidEmail(input) || isValidPhoneNumber(input);
    }
}