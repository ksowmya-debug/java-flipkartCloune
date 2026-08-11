package com.flipkart.flipkart_backend.repository;

import com.flipkart.flipkart_backend.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    
    // Find products by their category
    List<Product> findByCategory(String category);
    
    // Search products by name (case insensitive)
    List<Product> findByNameContainingIgnoreCase(String name);
}
