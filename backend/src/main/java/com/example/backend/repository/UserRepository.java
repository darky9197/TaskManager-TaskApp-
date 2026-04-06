package com.example.backend.repository;

import com.example.backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<Users, UUID> {
    public Optional<Users> findByEmail(String email);
}
