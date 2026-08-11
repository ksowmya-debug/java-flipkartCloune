package com.flipkart.flipkart_backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    private String productId; // ID of the purchased product
    private String productName; // Name of the product
    private Integer quantity; // Quantity purchased
    private Double price; // Price per unit at the time of purchase
    private String imageUrl; // Product image
}
