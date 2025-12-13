package com.example.backend.exception;

public class SecurityException extends RuntimeException {
    public SecurityException(String message) {
        super(message);
    }
}
