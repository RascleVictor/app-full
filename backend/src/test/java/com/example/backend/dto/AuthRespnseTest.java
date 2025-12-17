package com.example.backend.dto;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AuthResponseTest {

    @Test
    void testConstructorAndGetters() {
        AuthResponse authResponse = new AuthResponse("jwt-token");

        assertEquals("jwt-token", authResponse.getToken());
        assertEquals("Bearer", authResponse.getTokenType());
    }
}
