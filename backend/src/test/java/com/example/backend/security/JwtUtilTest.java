package com.example.backend.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    private static final String SECRET = "my-test-secret-key-my-test-secret-key";
    private static final long EXPIRATION = 1000 * 60;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil();

        ReflectionTestUtils.setField(jwtUtil, "jwtSecret", SECRET);
        ReflectionTestUtils.setField(jwtUtil, "jwtExpirationMs", EXPIRATION);
    }

    @Test
    void generateToken_shouldReturnNonNullToken() {
        String token = jwtUtil.generateToken("john");

        assertNotNull(token);
        assertFalse(token.isBlank());
    }

    @Test
    void generateToken_shouldContainCorrectUsername() {
        String token = jwtUtil.generateToken("john");

        String username = jwtUtil.getUsernameFromToken(token);

        assertEquals("john", username);
    }

    @Test
    void validateToken_shouldReturnTrueForValidToken() {
        String token = jwtUtil.generateToken("john");

        assertTrue(jwtUtil.validateToken(token));
    }

    @Test
    void validateToken_shouldReturnFalseForInvalidToken() {
        assertFalse(jwtUtil.validateToken("invalid.token.value"));
    }

    @Test
    void validateToken_shouldReturnFalseForTokenWithDifferentSecret() {
        String token = jwtUtil.generateToken("john");

        JwtUtil otherJwtUtil = new JwtUtil();
        ReflectionTestUtils.setField(otherJwtUtil, "jwtSecret",
                "another-secret-key-another-secret-key");
        ReflectionTestUtils.setField(otherJwtUtil, "jwtExpirationMs", EXPIRATION);

        assertFalse(otherJwtUtil.validateToken(token));
    }

    @Test
    void validateToken_shouldReturnFalseForExpiredToken() throws InterruptedException {
        ReflectionTestUtils.setField(jwtUtil, "jwtExpirationMs", 1L);

        String token = jwtUtil.generateToken("john");

        Thread.sleep(5);

        assertFalse(jwtUtil.validateToken(token));
    }

    @Test
    void getUsernameFromToken_shouldThrowExceptionForInvalidToken() {
        assertThrows(Exception.class, () ->
                jwtUtil.getUsernameFromToken("invalid.token")
        );
    }
}
