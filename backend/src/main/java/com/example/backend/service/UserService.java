package com.example.backend.service;

import com.example.backend.dto.RegisterRequest;
import com.example.backend.model.User;

public interface UserService {

    User register(RegisterRequest request);

    User findByUsername(String username);
}
