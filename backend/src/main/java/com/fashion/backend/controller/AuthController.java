package com.fashion.backend.controller;

import com.fashion.backend.dto.*;
import com.fashion.backend.repository.UserRepository;
import com.fashion.backend.service.AuthService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    private final UserRepository userRepository;
    
    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(Map.of("error", errors));
        }
        
        try {
            String result = authService.register(request.getName(), request.getEmail(), request.getPhoneNumber(), request.getPassword());
            return ResponseEntity.ok(Map.of("message", result, "success", true));
        } catch (RuntimeException e) {
            logger.error("Registration failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage(), "success", false));
        } catch (Exception e) {
            logger.error("Registration failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Registration failed. Please try again.", "success", false));
        }
    }
    
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody OtpRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(Map.of("error", errors));
        }
        
        try {
            String token = authService.verifyOtp(request.getEmailOrPhone(), request.getOtp());
            return ResponseEntity.ok(Map.of("token", token, "message", "Verification successful", "success", true));
        } catch (RuntimeException e) {
            logger.error("OTP verification failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage(), "success", false));
        } catch (Exception e) {
            logger.error("OTP verification failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Verification failed. Please try again.", "success", false));
        }
    }
    
    @PostMapping("/password-login")
    public ResponseEntity<?> passwordLogin(@Valid @RequestBody PasswordLoginRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(Map.of("error", errors));
        }
        
        try {
            String token = authService.passwordLogin(request.getEmailOrPhone(), request.getPassword());
            
            // Get user details for response
            var user = userRepository.findByEmail(request.getEmailOrPhone())
                .or(() -> userRepository.findByPhoneNumber(request.getEmailOrPhone()))
                .orElseThrow(() -> new RuntimeException("User not found"));
            
            return ResponseEntity.ok(Map.of(
                "token", token, 
                "message", "Login successful", 
                "success", true,
                "name", user.getName(),
                "email", user.getEmail()
            ));
        } catch (RuntimeException e) {
            logger.error("Password login failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage(), "success", false));
        } catch (Exception e) {
            logger.error("Password login failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Login failed. Please try again.", "success", false));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(Map.of("error", errors));
        }
        
        try {
            String result = authService.login(request.getEmailOrPhone());
            return ResponseEntity.ok(Map.of("message", result, "success", true));
        } catch (RuntimeException e) {
            logger.error("Login failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage(), "success", false));
        } catch (Exception e) {
            logger.error("Login failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Login failed. Please try again.", "success", false));
        }
    }
    
    @PostMapping("/verify-login-otp")
    public ResponseEntity<?> verifyLoginOtp(@Valid @RequestBody OtpRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(Map.of("error", errors));
        }
        
        try {
            String token = authService.verifyLoginOtp(request.getEmailOrPhone(), request.getOtp());
            return ResponseEntity.ok(Map.of("token", token, "message", "Login successful", "success", true));
        } catch (RuntimeException e) {
            logger.error("Login OTP verification failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage(), "success", false));
        } catch (Exception e) {
            logger.error("Login OTP verification failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Login verification failed. Please try again.", "success", false));
        }
    }
    
    @PostMapping("/request-otp")
    public ResponseEntity<?> requestOtp(@Valid @RequestBody OtpMethodRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errors = bindingResult.getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(Map.of("error", errors));
        }
        
        try {
            String result = authService.requestOtp(request.getEmailOrPhone(), request.getMethod());
            return ResponseEntity.ok(Map.of("message", result, "success", true));
        } catch (RuntimeException e) {
            logger.error("OTP request failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage(), "success", false));
        } catch (Exception e) {
            logger.error("OTP request failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "OTP request failed. Please try again.", "success", false));
        }
    }
    
    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP", 
            "message", "Fashion Shop Q Auth Service is running",
            "timestamp", System.currentTimeMillis()
        ));
    }
    
    @DeleteMapping("/clear-users")
    public ResponseEntity<?> clearUsers() {
        try {
            String result = authService.clearAllUsers();
            return ResponseEntity.ok(Map.of("message", result, "success", true));
        } catch (Exception e) {
            logger.error("Failed to clear users", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to clear users", "success", false));
        }
    }
}