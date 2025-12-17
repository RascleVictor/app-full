package com.example.backend.dto;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LoginRequestTest {

    @Test
    void testSettersAndGetters() {
        LoginRequest loginRequest = new LoginRequest();

        loginRequest.setUsername("john");
        loginRequest.setPassword("password");

        assertEquals("john", loginRequest.getUsername());
        assertEquals("password", loginRequest.getPassword());
    }
}
