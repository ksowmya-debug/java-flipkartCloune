package com.flipkart.flipkart_backend.util;

import com.flipkart.flipkart_backend.model.Product;
import com.flipkart.flipkart_backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    public DataSeeder(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Force re-seed to replace placeholder images with Unsplash images
        productRepository.deleteAll();
        System.out.println("Cleared existing products. Seeding initial data with real images...");

            List<Product> products = List.of(
                    Product.builder()
                            .name("Apple iPhone 15 Pro (128GB) - Natural Titanium")
                            .brand("Apple")
                            .category("Mobiles")
                            .description("Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.")
                            .price(999.00)
                            .originalPrice(1099.00)
                            .discount(9)
                            .stock(50)
                            .imageUrl("https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop")
                            .rating(4.8)
                            .build(),

                    Product.builder()
                            .name("Samsung Galaxy S25 Ultra 5G (512GB)")
                            .brand("Samsung")
                            .category("Mobiles")
                            .description("The ultimate Galaxy experience with AI built-in. Features a massive 200MP camera and the integrated S-Pen.")
                            .price(1299.99)
                            .originalPrice(1399.99)
                            .discount(7)
                            .stock(30)
                            .imageUrl("https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=600&auto=format&fit=crop")
                            .rating(4.7)
                            .build(),

                    Product.builder()
                            .name("OnePlus 13 5G (16GB RAM, 512GB Storage)")
                            .brand("OnePlus")
                            .category("Mobiles")
                            .description("Fast and smooth experience with Snapdragon 8 Gen 4 and Hasselblad Camera for Mobile.")
                            .price(799.00)
                            .originalPrice(899.00)
                            .discount(11)
                            .stock(40)
                            .imageUrl("https://images.unsplash.com/photo-1598327105666-5b89351cb31b?q=80&w=600&auto=format&fit=crop")
                            .rating(4.6)
                            .build(),

                    Product.builder()
                            .name("Sony WH-1000XM5 Wireless Noise Canceling Headphones")
                            .brand("Sony")
                            .category("Electronics")
                            .description("Industry-leading noise cancelation optimized to you. Magnificent sound, engineered to perfection.")
                            .price(348.00)
                            .originalPrice(398.00)
                            .discount(12)
                            .stock(100)
                            .imageUrl("https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=600&auto=format&fit=crop")
                            .rating(4.8)
                            .build(),

                    Product.builder()
                            .name("boAt Airdopes 141 Bluetooth Wireless Earbuds")
                            .brand("boAt")
                            .category("Electronics")
                            .description("Wireless earbuds with 42H playtime, low latency mode for gaming, and clear calling.")
                            .price(29.99)
                            .originalPrice(59.99)
                            .discount(50)
                            .stock(200)
                            .imageUrl("https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop")
                            .rating(4.1)
                            .build(),

                    Product.builder()
                            .name("Dell XPS 15 Laptop (Intel Core i9, 32GB RAM)")
                            .brand("Dell")
                            .category("Computers")
                            .description("The XPS 15 is the perfect balance of power and portability with an immersive OLED display.")
                            .price(1899.00)
                            .originalPrice(2199.00)
                            .discount(13)
                            .stock(15)
                            .imageUrl("https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop")
                            .rating(4.5)
                            .build(),

                    Product.builder()
                            .name("Nike Air Max 270 Men's Sneakers")
                            .brand("Nike")
                            .category("Fashion")
                            .description("Nike's first lifestyle Air Max brings you style, comfort and big attitude.")
                            .price(150.00)
                            .originalPrice(160.00)
                            .discount(6)
                            .stock(60)
                            .imageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop")
                            .rating(4.7)
                            .build(),

                    Product.builder()
                            .name("Puma Velocity Nitro 3 Running Shoes")
                            .brand("Puma")
                            .category("Fashion")
                            .description("Lightweight, responsive running shoes designed for ultimate speed and comfort.")
                            .price(120.00)
                            .originalPrice(140.00)
                            .discount(14)
                            .stock(75)
                            .imageUrl("https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop")
                            .rating(4.4)
                            .build()
            );

            productRepository.saveAll(products);
            System.out.println("Successfully inserted 8 sample products with beautiful images!");
    }
}
