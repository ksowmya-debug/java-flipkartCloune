package com.flipkart.flipkart_backend.repository;

import com.flipkart.flipkart_backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    // Find a user by their email (used for login/authentication)
    Optional<User> findByEmail(String email);
    
    // Check if an email is already registered (used for signup)
    Boolean existsByEmail(String email);
}
