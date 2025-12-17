package com.example.backend.dto;

import org.junit.jupiter.api.Test;
import java.time.Instant;
import static org.junit.jupiter.api.Assertions.*;

class UserResponseTest {

    @Test
    void testConstructorAndGetters() {
        Instant now = Instant.now();
        UserResponse userResponse = new UserResponse(1L, "john", "john@test.com", "USER", now);

        assertEquals(1L, userResponse.getId());
        assertEquals("john", userResponse.getUsername());
        assertEquals("john@test.com", userResponse.getEmail());
        assertEquals("USER", userResponse.getRole());
        assertEquals(now, userResponse.getCreatedAt());
    }
}
