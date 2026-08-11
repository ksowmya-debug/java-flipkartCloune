package com.flipkart.flipkart_backend.controller;

import com.flipkart.flipkart_backend.dto.OrderRequest;
import com.flipkart.flipkart_backend.model.Order;
import com.flipkart.flipkart_backend.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<Order> placeOrder(@Valid @RequestBody OrderRequest request, Principal principal) {
        // 'principal.getName()' gives us the email of the logged-in user from the JWT Token!
        String userEmail = principal.getName();
        return ResponseEntity.ok(orderService.placeOrder(userEmail, request));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getMyOrders(Principal principal) {
        String userEmail = principal.getName();
        return ResponseEntity.ok(orderService.getOrdersByUser(userEmail));
    }
}
