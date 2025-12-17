package com.example.backend.service.impl;

import com.example.backend.dto.RegisterRequest;
import com.example.backend.exception.ResourceAlreadyExistsException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void register_shouldCreateUserSuccessfully() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("john");
        request.setEmail("john@test.com");
        request.setPassword("password");

        when(userRepository.existsByUsername("john")).thenReturn(false);
        when(userRepository.existsByEmail("john@test.com")).thenReturn(false);
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        User user = userService.register(request);

        assertNotNull(user);
        assertEquals("john", user.getUsername());
        assertEquals("john@test.com", user.getEmail());
        assertEquals("encodedPassword", user.getPassword());
        assertEquals("USER", user.getRole());

        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_shouldFailIfUsernameExists() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("john");
        request.setEmail("john@test.com");

        when(userRepository.existsByUsername("john")).thenReturn(true);

        assertThrows(ResourceAlreadyExistsException.class,
                () -> userService.register(request));

        verify(userRepository, never()).save(any());
    }

    @Test
    void register_shouldFailIfEmailExists() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("john");
        request.setEmail("john@test.com");

        when(userRepository.existsByUsername("john")).thenReturn(false);
        when(userRepository.existsByEmail("john@test.com")).thenReturn(true);

        assertThrows(ResourceAlreadyExistsException.class,
                () -> userService.register(request));

        verify(userRepository, never()).save(any());
    }

    @Test
    void findByUsername_shouldReturnUser() {
        User user = new User();
        user.setUsername("john");

        when(userRepository.findByUsername("john"))
                .thenReturn(Optional.of(user));

        User result = userService.findByUsername("john");

        assertEquals("john", result.getUsername());
    }

    @Test
    void findByUsername_shouldThrowIfNotFound() {
        when(userRepository.findByUsername("john"))
                .thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> userService.findByUsername("john"));
    }
}
