package com.flipkart.flipkart_backend.service;

import com.flipkart.flipkart_backend.dto.ProductRequest;
import com.flipkart.flipkart_backend.exception.ResourceNotFoundException;
import com.flipkart.flipkart_backend.model.Product;
import com.flipkart.flipkart_backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public Product createProduct(ProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .brand(request.getBrand())
                .category(request.getCategory())
                .description(request.getDescription())
                .price(request.getPrice())
                .originalPrice(request.getOriginalPrice())
                .discount(request.getDiscount())
                .stock(request.getStock())
                .imageUrl(request.getImageUrl())
                .rating(request.getRating())
                .build();
        
        return productRepository.save(product);
    }

    public Product updateProduct(String id, ProductRequest request) {
        Product existingProduct = getProductById(id);
        
        existingProduct.setName(request.getName());
        existingProduct.setBrand(request.getBrand());
        existingProduct.setCategory(request.getCategory());
        existingProduct.setDescription(request.getDescription());
        existingProduct.setPrice(request.getPrice());
        existingProduct.setOriginalPrice(request.getOriginalPrice());
        existingProduct.setDiscount(request.getDiscount());
        existingProduct.setStock(request.getStock());
        existingProduct.setImageUrl(request.getImageUrl());
        existingProduct.setRating(request.getRating());

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(String id) {
        Product existingProduct = getProductById(id);
        productRepository.delete(existingProduct);
    }
}
