package com.fashion.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PasswordLoginRequest {
    @NotBlank(message = "Email or phone number is required")
    private String emailOrPhone;
    
    @NotBlank(message = "Password is required")
    private String password;
}