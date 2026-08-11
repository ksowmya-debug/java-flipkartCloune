package com.flipkart.flipkart_backend.exception;

/**
 * Why are Custom Exceptions useful?
 * Instead of throwing a generic "RuntimeException", creating a specific exception like
 * "ResourceNotFoundException" makes our code much cleaner. It clearly tells other developers
 * (and our GlobalExceptionHandler) exactly what went wrong.
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
