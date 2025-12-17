package com.example.backend.model;

import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;

class UserTest {

    @Test
    void testSettersAndGetters() {
        User user = new User();

        user.setUsername("john");
        user.setEmail("john@test.com");
        user.setPassword("password");
        user.setRole("USER");

        assertThat(user.getUsername()).isEqualTo("john");
        assertThat(user.getEmail()).isEqualTo("john@test.com");
        assertThat(user.getPassword()).isEqualTo("password");
        assertThat(user.getRole()).isEqualTo("USER");
    }

    @Test
    void testPrePersistSetsCreatedAt() {
        User user = new User();

        user.onCreate();

        assertThat(user.getCreatedAt()).isNotNull();
        assertThat(user.getCreatedAt()).isInstanceOf(Instant.class);
    }
}
