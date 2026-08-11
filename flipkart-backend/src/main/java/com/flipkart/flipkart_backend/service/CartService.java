package com.flipkart.flipkart_backend.service;

import com.flipkart.flipkart_backend.model.CartItem;
import com.flipkart.flipkart_backend.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public List<CartItem> getCartItems(String userEmail) {
        return cartRepository.findByUserEmail(userEmail);
    }

    public CartItem addToCart(String userEmail, CartItem cartItem) {
        Optional<CartItem> existingItem = cartRepository.findByUserEmailAndProductId(userEmail, cartItem.getProductId());
        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + 1);
            return cartRepository.save(item);
        } else {
            cartItem.setUserEmail(userEmail);
            cartItem.setQuantity(1);
            return cartRepository.save(cartItem);
        }
    }

    public void removeFromCart(String id) {
        cartRepository.deleteById(id);
    }

    public CartItem decreaseQuantity(String id) {
        Optional<CartItem> existingItem = cartRepository.findById(id);
        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            if (item.getQuantity() > 1) {
                item.setQuantity(item.getQuantity() - 1);
                return cartRepository.save(item);
            } else {
                cartRepository.deleteById(id);
                return null;
            }
        }
        throw new RuntimeException("Cart item not found");
    }

    public void clearCart(String userEmail) {
        cartRepository.deleteByUserEmail(userEmail);
    }
}
