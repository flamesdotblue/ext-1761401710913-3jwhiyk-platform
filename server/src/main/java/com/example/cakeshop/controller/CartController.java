package com.example.cakeshop.controller;

import com.example.cakeshop.entity.CartItem;
import com.example.cakeshop.entity.Product;
import com.example.cakeshop.entity.User;
import com.example.cakeshop.repo.CartItemRepository;
import com.example.cakeshop.repo.ProductRepository;
import com.example.cakeshop.repo.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CartController {
    private final CartItemRepository cartItems;
    private final UserRepository users;
    private final ProductRepository products;

    public CartController(CartItemRepository cartItems, UserRepository users, ProductRepository products) {
        this.cartItems = cartItems; this.users = users; this.products = products;
    }

    @GetMapping
    public List<CartItem> getCart(Authentication auth) {
        User u = users.findByEmail(auth.getName()).orElseThrow();
        return cartItems.findByUser(u);
    }

    public record AddItem(Long productId, int quantity) {}

    @PostMapping
    public ResponseEntity<?> add(Authentication auth, @RequestBody AddItem req) {
        User u = users.findByEmail(auth.getName()).orElseThrow();
        Product p = products.findById(req.productId()).orElseThrow();
        CartItem ci = new CartItem();
        ci.setUser(u); ci.setProduct(p); ci.setQuantity(Math.max(1, req.quantity()));
        cartItems.save(ci);
        return ResponseEntity.ok(Map.of("ok", true));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(Authentication auth, @PathVariable Long id) {
        cartItems.deleteById(id);
        return ResponseEntity.ok(Map.of("ok", true));
    }

    @PostMapping("/clear")
    public ResponseEntity<?> clear(Authentication auth) {
        User u = users.findByEmail(auth.getName()).orElseThrow();
        cartItems.deleteByUser(u);
        return ResponseEntity.ok(Map.of("ok", true));
    }
}
