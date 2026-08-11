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
@Document(collection = "products")
public class Product {

    @Id
    private String id; // Unique identifier for the product

    private String name; // Name of the product
    private String brand; // Brand of the product
    private String category; // Category (e.g., Electronics, Clothing)
    private String description; // Detailed description of the product
    private Double price; // Current selling price
    private Double originalPrice; // Original price before discount
    private Integer discount; // Discount percentage
    private Integer stock; // Number of items available in inventory
    private String imageUrl; // URL to the product image
    private Double rating; // Average customer rating
}
