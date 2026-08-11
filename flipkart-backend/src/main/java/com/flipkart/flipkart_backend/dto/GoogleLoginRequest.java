package com.flipkart.flipkart_backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GoogleLoginRequest {
    
    @NotBlank(message = "Token cannot be empty")
    private String credential; // This is the Google JWT token sent from the React frontend
}
