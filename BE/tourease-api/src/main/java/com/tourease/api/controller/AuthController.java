package com.tourease.api.controller;

import com.tourease.api.DTO.AuthRequest;
import com.tourease.api.DTO.AuthResponse;
import com.tourease.api.DTO.RegisterRequest;
import com.tourease.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody AuthRequest request) {
    	
    	AuthResponse response = authService.authenticate(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
    	AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
        
    }
}