package com.flipkart.flipkart_backend.service;

import com.flipkart.flipkart_backend.dto.LoginRequest;
import com.flipkart.flipkart_backend.dto.LoginResponse;
import com.flipkart.flipkart_backend.dto.RegisterRequest;
import com.flipkart.flipkart_backend.exception.ResourceNotFoundException;
import com.flipkart.flipkart_backend.model.User;
import com.flipkart.flipkart_backend.repository.UserRepository;
import com.flipkart.flipkart_backend.security.JwtUtil;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public User registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already registered!");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                // Encrypt the password before saving to the database
                .password(passwordEncoder.encode(request.getPassword()))
                .role("USER") // Default role
                .build();

        return userRepository.save(user);
    }

    public LoginResponse authenticateUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password!"));

        // Check if the provided raw password matches the hashed password in the database
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password!");
        }

        // Generate JWT Token
        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(token, user.getName(), user.getEmail(), user.getRole());
    }

    public LoginResponse googleLogin(String credential) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(credential);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();
                String name = (String) payload.get("name");

                // Find user or create a new one
                Optional<User> userOptional = userRepository.findByEmail(email);
                User user;
                if (userOptional.isPresent()) {
                    user = userOptional.get();
                } else {
                    user = User.builder()
                            .name(name)
                            .email(email)
                            // Generate a random password since they login with Google
                            .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                            .role("USER")
                            .build();
                    user = userRepository.save(user);
                }

                String token = jwtUtil.generateToken(user.getEmail());
                return new LoginResponse(token, user.getName(), user.getEmail(), user.getRole());
            } else {
                throw new RuntimeException("Invalid Google Token");
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to verify Google Token", e);
        }
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
}
