package com.example.backend.dto;

import java.time.Instant;

public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private String role;
    private Instant createdAt;

    public UserResponse(
            Long id,
            String username,
            String email,
            String role,
            Instant createdAt
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public Instant getCreatedAt() { return createdAt; }
}
