package com.flipkart.flipkart_backend.repository;

import com.flipkart.flipkart_backend.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    
    // Find all orders placed by a specific user
    List<Order> findByUserId(String userId);
}
