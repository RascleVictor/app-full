package com.example.backend.repository;

import com.example.backend.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb",
        "spring.datasource.driver-class-name=org.h2.Driver",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.jpa.database-platform=org.hibernate.dialect.H2Dialect"
})
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testSaveAndFindByUsername() {
        // Given
        User user = new User();
        user.setUsername("john");
        user.setEmail("john@test.com");
        user.setPassword("password");
        user.setRole("USER");

        // When
        userRepository.save(user);
        Optional<User> found = userRepository.findByUsername("john");

        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getEmail()).isEqualTo("john@test.com");
    }

    @Test
    void testFindByEmail() {
        // Given
        User user = new User();
        user.setUsername("alice");
        user.setEmail("alice@test.com");
        user.setPassword("password");
        user.setRole("USER");

        // When
        userRepository.save(user);
        Optional<User> found = userRepository.findByEmail("alice@test.com");

        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getUsername()).isEqualTo("alice");
    }

    @Test
    void testExistsByUsername() {
        // Given
        User user = new User();
        user.setUsername("bob");
        user.setEmail("bob@test.com");
        user.setPassword("password");
        user.setRole("USER");

        // When
        userRepository.save(user);

        // Then
        assertThat(userRepository.existsByUsername("bob")).isTrue();
        assertThat(userRepository.existsByUsername("unknown")).isFalse();
    }

    @Test
    void testExistsByEmail() {
        // Given
        User user = new User();
        user.setUsername("eve");
        user.setEmail("eve@test.com");
        user.setPassword("password");
        user.setRole("USER");

        // When
        userRepository.save(user);

        // Then
        assertThat(userRepository.existsByEmail("eve@test.com")).isTrue();
        assertThat(userRepository.existsByEmail("unknown@test.com")).isFalse();
    }
}