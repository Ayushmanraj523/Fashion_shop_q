package com.fashion.backend.service;

import com.fashion.backend.model.User;
import com.fashion.backend.repository.UserRepository;
import com.fashion.backend.util.ValidationUtil;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

@Service
public class AuthService {
    
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private int jwtExpiration;
    
    public AuthService(UserRepository userRepository, NotificationService notificationService) {
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }
    
    public String register(String name, String email, String phoneNumber, String password) {
        if (!ValidationUtil.isValidEmail(email)) {
            throw new RuntimeException("Invalid email format");
        }
        if (!ValidationUtil.isValidPhoneNumber(phoneNumber)) {
            throw new RuntimeException("Invalid phone number format");
        }
        if (password == null || password.length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters");
        }
        
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        
        String formattedPhoneNumber = ValidationUtil.formatPhoneNumber(phoneNumber);
        if (userRepository.findByPhoneNumber(formattedPhoneNumber).isPresent()) {
            throw new RuntimeException("Phone number already exists");
        }
        
        String emailOtp = generateOtp();
        String smsOtp = generateOtp();
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPhoneNumber(formattedPhoneNumber);
        user.setPassword(password);
        user.setEmailOtp(emailOtp);
        user.setSmsOtp(smsOtp);
        user.setOtpExpiryTime(LocalDateTime.now().plusMinutes(5));
        user.setVerified(false);
        
        userRepository.save(user);
        
        // Send OTP to both email and SMS
        notificationService.sendEmailOtp(email, emailOtp);
        notificationService.sendSmsOtp(formattedPhoneNumber, smsOtp);
        
        return "OTP sent to your email and phone number. Use either OTP to verify your account.";
    }
    
    public String verifyOtp(String emailOrPhone, String otp) {
        Optional<User> userOpt = Optional.empty();
        
        if (ValidationUtil.isValidEmail(emailOrPhone)) {
            userOpt = userRepository.findByEmail(emailOrPhone);
        } else if (ValidationUtil.isValidPhoneNumber(emailOrPhone)) {
            String formattedPhone = ValidationUtil.formatPhoneNumber(emailOrPhone);
            userOpt = userRepository.findByPhoneNumber(formattedPhone);
        }
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        User user = userOpt.get();
        
        if (user.getOtpExpiryTime() == null || user.getOtpExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired. Please request a new OTP.");
        }
        
        // Check if OTP matches either email OTP or SMS OTP
        boolean isValidEmailOtp = user.getEmailOtp() != null && user.getEmailOtp().equals(otp);
        boolean isValidSmsOtp = user.getSmsOtp() != null && user.getSmsOtp().equals(otp);
        
        if (!isValidEmailOtp && !isValidSmsOtp) {
            throw new RuntimeException("Invalid OTP. Please check and try again.");
        }
        
        user.setVerified(true);
        user.setEmailOtp(null);
        user.setSmsOtp(null);
        user.setOtpExpiryTime(null);
        userRepository.save(user);
        
        return generateJwtToken(user);
    }
    
    public String login(String emailOrPhone) {
        Optional<User> userOpt = Optional.empty();
        boolean isEmail = ValidationUtil.isValidEmail(emailOrPhone);
        
        if (isEmail) {
            userOpt = userRepository.findByEmail(emailOrPhone);
        } else if (ValidationUtil.isValidPhoneNumber(emailOrPhone)) {
            String formattedPhone = ValidationUtil.formatPhoneNumber(emailOrPhone);
            userOpt = userRepository.findByPhoneNumber(formattedPhone);
        }
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        User user = userOpt.get();
        if (!user.isVerified()) {
            throw new RuntimeException("User not verified. Please complete registration first.");
        }
        
        String otp = generateOtp();
        user.setOtpExpiryTime(LocalDateTime.now().plusMinutes(5));
        
        if (isEmail) {
            user.setEmailOtp(otp);
            user.setSmsOtp(null);
            notificationService.sendEmailOtp(user.getEmail(), otp);
        } else {
            user.setSmsOtp(otp);
            user.setEmailOtp(null);
            notificationService.sendSmsOtp(user.getPhoneNumber(), otp);
        }
        
        userRepository.save(user);
        
        return "OTP sent to your " + (isEmail ? "email" : "phone number");
    }
    
    public String verifyLoginOtp(String emailOrPhone, String otp) {
        return verifyOtp(emailOrPhone, otp);
    }
    
    public String requestOtp(String emailOrPhone, String method) {
        Optional<User> userOpt = Optional.empty();
        
        if (ValidationUtil.isValidEmail(emailOrPhone)) {
            userOpt = userRepository.findByEmail(emailOrPhone);
        } else if (ValidationUtil.isValidPhoneNumber(emailOrPhone)) {
            String formattedPhone = ValidationUtil.formatPhoneNumber(emailOrPhone);
            userOpt = userRepository.findByPhoneNumber(formattedPhone);
        }
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        User user = userOpt.get();
        if (!user.isVerified()) {
            throw new RuntimeException("User not verified. Please complete registration first.");
        }
        
        String otp = generateOtp();
        user.setOtpExpiryTime(LocalDateTime.now().plusMinutes(5));
        
        if ("email".equalsIgnoreCase(method)) {
            user.setEmailOtp(otp);
            user.setSmsOtp(null);
            notificationService.sendEmailOtp(user.getEmail(), otp);
            userRepository.save(user);
            return "OTP sent to your email address";
        } else if ("sms".equalsIgnoreCase(method)) {
            user.setSmsOtp(otp);
            user.setEmailOtp(null);
            notificationService.sendSmsOtp(user.getPhoneNumber(), otp);
            userRepository.save(user);
            return "OTP sent to your phone number";
        } else {
            throw new RuntimeException("Invalid method. Use 'email' or 'sms'");
        }
    }
    
    private String generateOtp() {
        SecureRandom secureRandom = new SecureRandom();
        return String.format("%06d", secureRandom.nextInt(1000000));
    }
    
    public String passwordLogin(String emailOrPhone, String password) {
        Optional<User> userOpt = Optional.empty();
        
        if (ValidationUtil.isValidEmail(emailOrPhone)) {
            userOpt = userRepository.findByEmail(emailOrPhone);
        } else if (ValidationUtil.isValidPhoneNumber(emailOrPhone)) {
            String formattedPhone = ValidationUtil.formatPhoneNumber(emailOrPhone);
            userOpt = userRepository.findByPhoneNumber(formattedPhone);
        }
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        
        User user = userOpt.get();
        if (!user.isVerified()) {
            throw new RuntimeException("User not verified. Please complete registration first.");
        }
        
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }
        
        return generateJwtToken(user);
    }
    
    public String clearAllUsers() {
        userRepository.deleteAll();
        return "All users cleared from database";
    }
    
    private String generateJwtToken(User user) {
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}