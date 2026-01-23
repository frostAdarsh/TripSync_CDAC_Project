package com.travel.auth.service;

import com.travel.auth.dto.AuthRequest;
import com.travel.auth.dto.AuthResponse;
import com.travel.auth.dto.RegisterRequest;
import com.travel.auth.entity.Role;
import com.travel.auth.entity.User;
import com.travel.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Registers a new user, saves them to the DB, and returns a JWT token.
     */
    public AuthResponse register(RegisterRequest request) {
        // 1. Create the User object
        var user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email().trim()) // FIX: Remove accidental spaces
                // Important: Never save plain text passwords!
                .password(passwordEncoder.encode(request.password()))
                // Default to CUSTOMER if no role is provided
                .role(request.role() != null ? request.role() : Role.CUSTOMER)
                .build();
        
        // 2. Save to MySQL
        repository.save(user);
        
        // 3. Generate the JWT token immediately so the user doesn't have to login again
        var jwtToken = jwtService.generateToken(user);
        
        return new AuthResponse(jwtToken, "User registered successfully");
    }

    /**
     * Authenticates an existing user and returns a JWT token.
     */
    public AuthResponse login(AuthRequest request) {
        
        // 0. Clean the input (Fix for "User not found" errors due to spaces)
        String cleanEmail = request.email().trim();

        // 1. This method will throw an exception if the password is wrong
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        cleanEmail,
                        request.password()
                )
        );
        
        // 2. If we get here, the user is authenticated. Retrieve them from DB.
        var user = repository.findByEmail(cleanEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // 3. Generate a fresh token
        var jwtToken = jwtService.generateToken(user);
        
        return new AuthResponse(jwtToken, "Login successful");
    }
}