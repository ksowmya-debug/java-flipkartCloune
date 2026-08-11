package com.flipkart.flipkart_backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order {

    @Id
    private String id; // Unique identifier for the order

    private String userId; // ID of the user who placed the order
    private List<OrderItem> items; // List of items purchased in this order
    private Double totalAmount; // Total cost of the order
    private String status; // Order status (e.g., PENDING, SHIPPED, DELIVERED)

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now(); // Timestamp of order creation
}
