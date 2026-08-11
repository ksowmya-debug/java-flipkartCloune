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
@Document(collection = "cart")
public class CartItem {
    @Id
    private String id;
    private String userEmail;
    private String productId;
    private String title;
    private String image;
    private Double price;
    private Double originalPrice;
    private Integer quantity;
}
