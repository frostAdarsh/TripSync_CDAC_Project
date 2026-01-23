package com.travel.auth.controller;

import com.travel.auth.dto.AuthRequest;
import com.travel.auth.dto.AuthResponse;
import com.travel.auth.dto.RegisterRequest;
import com.travel.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Endpoint: POST /api/auth/register
     * Description: Creates a new user (Admin or Customer) and returns a JWT token.
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    /**
     * Endpoint: POST /api/auth/login
     * Description: Authenticates existing credentials and returns a JWT token.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // In a stateless system, we just tell the client "OK"
        // The client is responsible for deleting the token.
        return ResponseEntity.ok("Logged out successfully");
    }
}