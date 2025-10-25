package com.example.cakeshop.repo;

import com.example.cakeshop.entity.CartItem;
import com.example.cakeshop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    void deleteByUser(User user);
}
