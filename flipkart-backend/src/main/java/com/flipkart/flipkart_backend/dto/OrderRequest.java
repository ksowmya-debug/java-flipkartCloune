package com.flipkart.flipkart_backend.dto;

import com.flipkart.flipkart_backend.model.OrderItem;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    @NotEmpty(message = "Order must contain at least one item")
    private List<OrderItem> items;
}
