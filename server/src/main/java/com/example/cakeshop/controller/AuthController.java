package com.example.cakeshop.controller;

import com.example.cakeshop.entity.User;
import com.example.cakeshop.repo.UserRepository;
import com.example.cakeshop.security.JwtUtil;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository users, PasswordEncoder encoder, JwtUtil jwtUtil) {
        this.users = users; this.encoder = encoder; this.jwtUtil = jwtUtil;
    }

    public record RegisterRequest(@Email String email, @NotBlank String password, @NotBlank String fullName) {}
    public record LoginRequest(@Email String email, @NotBlank String password) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (users.findByEmail(req.email()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already in use"));
        }
        User u = new User();
        u.setEmail(req.email());
        u.setPasswordHash(encoder.encode(req.password()));
        u.setFullName(req.fullName());
        users.save(u);
        String token = jwtUtil.generateToken(u.getEmail());
        return ResponseEntity.ok(Map.of("token", token, "user", Map.of("id", u.getId(), "email", u.getEmail(), "fullName", u.getFullName())));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return users.findByEmail(req.email())
                .filter(u -> encoder.matches(req.password(), u.getPasswordHash()))
                .<ResponseEntity<?>>map(u -> ResponseEntity.ok(Map.of(
                        "token", jwtUtil.generateToken(u.getEmail()),
                        "user", Map.of("id", u.getId(), "email", u.getEmail(), "fullName", u.getFullName())
                )))
                .orElseGet(() -> ResponseEntity.status(401).body(Map.of("error", "Invalid credentials")));
    }
}
