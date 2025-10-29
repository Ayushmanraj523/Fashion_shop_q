package com.fashion.backend.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    
    private final JavaMailSender mailSender;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Value("${twilio.account.sid}")
    private String accountSid;
    
    @Value("${twilio.auth.token}")
    private String authToken;
    
    @Value("${twilio.phone.number}")
    private String fromPhoneNumber;
    
    public NotificationService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    public void sendEmailOtp(String toEmail, String otp) {
        try {
            System.out.println("📧 Attempting to send email to: " + toEmail);
            System.out.println("🔑 Generated OTP: " + otp);
            System.out.println("⚙️ Email config - From: " + fromEmail);
            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Fashion Shop Q - OTP Verification");
            message.setText("Your OTP for Fashion Shop Q is: " + otp + "\nThis OTP will expire in 5 minutes.");
            
            mailSender.send(message);
            System.out.println("✅ EMAIL SENT: OTP sent successfully to " + toEmail);
        } catch (Exception e) {
            System.out.println("❌ EMAIL FAILED: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            System.out.println("🔑 USE THIS OTP: " + otp + " for verification");
            e.printStackTrace();
        }
    }
    
    public void sendSmsOtp(String toPhoneNumber, String otp) {
        try {
            System.out.println("📱 Attempting to send SMS to: " + toPhoneNumber);
            System.out.println("🔑 Generated OTP: " + otp);
            System.out.println("📱 From phone number: " + fromPhoneNumber);
            
            // Format phone number if it doesn't start with +
            String formattedPhoneNumber = toPhoneNumber;
            if (!toPhoneNumber.startsWith("+")) {
                if (toPhoneNumber.startsWith("91")) {
                    formattedPhoneNumber = "+" + toPhoneNumber;
                } else if (toPhoneNumber.length() == 10) {
                    formattedPhoneNumber = "+91" + toPhoneNumber;
                } else {
                    formattedPhoneNumber = "+" + toPhoneNumber;
                }
            }
            
            System.out.println("📱 Formatted TO number: " + formattedPhoneNumber);
            
            Twilio.init(accountSid, authToken);
            Message message = Message.creator(
                new PhoneNumber(formattedPhoneNumber),
                new PhoneNumber(fromPhoneNumber),
                "Your Fashion Shop Q OTP is: " + otp + ". Valid for 5 minutes."
            ).create();
            System.out.println("✅ SMS SENT: OTP sent successfully to " + formattedPhoneNumber);
            System.out.println("📱 Message SID: " + message.getSid());
        } catch (Exception e) {
            System.out.println("❌ SMS FAILED: " + e.getClass().getSimpleName() + " - " + e.getMessage());
            System.out.println("📱 USE THIS OTP FOR TESTING: " + otp);
            System.out.println("📱 Twilio Config - SID: " + (accountSid != null ? accountSid.substring(0, 10) + "..." : "null"));
            System.out.println("📱 From Number: " + fromPhoneNumber);
            e.printStackTrace();
        }
    }
}