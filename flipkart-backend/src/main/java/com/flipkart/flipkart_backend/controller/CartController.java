package com.flipkart.flipkart_backend.controller;

import com.flipkart.flipkart_backend.model.CartItem;
import com.flipkart.flipkart_backend.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCartItems(Authentication authentication) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(cartService.getCartItems(userEmail));
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(Authentication authentication, @RequestBody CartItem cartItem) {
        String userEmail = authentication.getName();
        return ResponseEntity.ok(cartService.addToCart(userEmail, cartItem));
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> removeFromCart(@PathVariable String id) {
        cartService.removeFromCart(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/decrease/{id}")
    public ResponseEntity<CartItem> decreaseQuantity(@PathVariable String id) {
        return ResponseEntity.ok(cartService.decreaseQuantity(id));
    }
}
