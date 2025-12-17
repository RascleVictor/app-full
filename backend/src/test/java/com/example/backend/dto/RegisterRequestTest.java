package com.example.backend.dto;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RegisterRequestTest {

    @Test
    void testSettersAndGetters() {
        RegisterRequest registerRequest = new RegisterRequest();

        registerRequest.setUsername("john");
        registerRequest.setEmail("john@test.com");
        registerRequest.setPassword("password123");

        assertEquals("john", registerRequest.getUsername());
        assertEquals("john@test.com", registerRequest.getEmail());
        assertEquals("password123", registerRequest.getPassword());
    }
}
