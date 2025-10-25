package com.example.cakeshop.controller;

import com.example.cakeshop.entity.CartItem;
import com.example.cakeshop.entity.User;
import com.example.cakeshop.repo.CartItemRepository;
import com.example.cakeshop.repo.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CheckoutController {
    private final CartItemRepository cartItems;
    private final UserRepository users;

    public CheckoutController(CartItemRepository cartItems, UserRepository users) {
        this.cartItems = cartItems; this.users = users;
    }

    public record PaymentRequest(String cardNumber, String cardExp, String cardCvc) {}

    @PostMapping
    public ResponseEntity<?> pay(Authentication auth, @RequestBody PaymentRequest req) {
        User u = users.findByEmail(auth.getName()).orElseThrow();
        List<CartItem> items = cartItems.findByUser(u);
        BigDecimal total = items.stream().map(ci -> ci.getProduct().getPrice().multiply(BigDecimal.valueOf(ci.getQuantity()))).reduce(BigDecimal.ZERO, BigDecimal::add);
        cartItems.deleteByUser(u);
        Map<String, Object> res = new HashMap<>();
        res.put("status", "succeeded");
        res.put("amount", total);
        res.put("message", "Payment simulated. No real charge.");
        return ResponseEntity.ok(res);
    }
}
