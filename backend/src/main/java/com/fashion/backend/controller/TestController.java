package com.fashion.backend.controller;

import com.fashion.backend.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    private final NotificationService notificationService;
    
    public TestController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }
    
    @PostMapping("/send-test-email")
    public ResponseEntity<?> testEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = "123456";
        
        notificationService.sendEmailOtp(email, otp);
        return ResponseEntity.ok(Map.of("message", "Test email sent", "otp", otp));
    }
    
    @PostMapping("/send-test-sms")
    public ResponseEntity<?> testSms(@RequestBody Map<String, String> request) {
        String phone = request.get("phone");
        String otp = "654321";
        
        notificationService.sendSmsOtp(phone, otp);
        return ResponseEntity.ok(Map.of("message", "Test SMS sent", "otp", otp));
    }
}