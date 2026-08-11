package com.flipkart.flipkart_backend.service;

import com.flipkart.flipkart_backend.dto.OrderRequest;
import com.flipkart.flipkart_backend.model.Order;
import com.flipkart.flipkart_backend.model.OrderItem;
import com.flipkart.flipkart_backend.model.User;
import com.flipkart.flipkart_backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;
    private final CartService cartService;

    public OrderService(OrderRepository orderRepository, UserService userService, CartService cartService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
        this.cartService = cartService;
    }

    public Order placeOrder(String userEmail, OrderRequest request) {
        // Find the user who is placing the order
        User user = userService.findByEmail(userEmail);

        // Calculate the total amount for the order based on items
        double totalAmount = 0.0;
        if (request.getItems() != null) {
            for (OrderItem item : request.getItems()) {
                totalAmount += (item.getPrice() * item.getQuantity());
            }
        }

        // Build the order document
        Order order = Order.builder()
                .userId(user.getId())
                .items(request.getItems())
                .totalAmount(totalAmount)
                .status("PLACED")
                .createdAt(LocalDateTime.now()) // Set current time
                .build();

        // Save order to MongoDB
        Order savedOrder = orderRepository.save(order);

        // Clear the user's cart
        cartService.clearCart(userEmail);

        return savedOrder;
    }

    public List<Order> getOrdersByUser(String userEmail) {
        User user = userService.findByEmail(userEmail);
        
        // Fetch orders, then sort them by createdAt descending (latest first)
        return orderRepository.findByUserId(user.getId()).stream()
                .sorted(Comparator.comparing(Order::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }
}
