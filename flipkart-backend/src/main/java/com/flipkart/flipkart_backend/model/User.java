package com.flipkart.flipkart_backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id; // Unique identifier for the user

    private String name; // Full name of the user
    private String email; // User's email address (should be unique)
    private String password; // Encrypted password
    private String role; // Role of the user (e.g., USER, ADMIN)
}
