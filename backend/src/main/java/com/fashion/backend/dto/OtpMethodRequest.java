package com.fashion.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class OtpMethodRequest {
    @NotBlank(message = "Email or phone number is required")
    private String emailOrPhone;
    
    @NotBlank(message = "Method is required")
    @Pattern(regexp = "^(email|sms)$", message = "Method must be 'email' or 'sms'")
    private String method;
}