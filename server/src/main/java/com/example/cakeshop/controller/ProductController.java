package com.example.cakeshop.controller;

import com.example.cakeshop.entity.Product;
import com.example.cakeshop.repo.ProductRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {
    private final ProductRepository products;

    public ProductController(ProductRepository products) { this.products = products; }

    @GetMapping
    public List<Product> all() { return products.findAll(); }

    @PostConstruct
    public void seed() {
        if (products.count() == 0) {
            products.saveAll(List.of(
                new Product("Chocolate Fudge Cake", "Rich chocolate layers with fudge frosting", "https://images.unsplash.com/photo-1542826438-60abfdb76b89?q=80&w=1470&auto=format&fit=crop", new BigDecimal("24.99")),
                new Product("Vanilla Berry Cake", "Vanilla sponge with fresh berries", "https://images.unsplash.com/photo-1551024709-8f23befc6cf7?q=80&w=1470&auto=format&fit=crop", new BigDecimal("19.99")),
                new Product("Red Velvet Cake", "Classic red velvet with cream cheese frosting", "https://images.unsplash.com/photo-1589307004173-3c95204b7b8c?q=80&w=1470&auto=format&fit=crop", new BigDecimal("22.50"))
            ));
        }
    }
}
