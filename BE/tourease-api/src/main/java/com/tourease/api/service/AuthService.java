package com.tourease.api.service;

import com.tourease.api.DTO.AuthRequest;
import com.tourease.api.DTO.AuthResponse;
import com.tourease.api.DTO.RegisterRequest;
import com.tourease.api.entity.User;
import com.tourease.api.jwt.JwtService;
import com.tourease.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse authenticate(AuthRequest request) throws AuthenticationException {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword())
        );
        User user = userRepository.findByUserName(request.getUserName())
            .orElseThrow(() -> new RuntimeException("User not found"));
        String token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByUserName(request.getUserName()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = User.builder()
            .userName(request.getUserName())
            .password(passwordEncoder.encode(request.getPassword()))
            .email(request.getEmail())
            .phoneNumber(request.getPhoneNumber())
            .address(request.getAddress())
            .role(User.Role.USER)
            .isActive(User.ActiveStatus.Y)
            .status(User.UserStatus.B)
            .createDate(LocalDateTime.now())
            .build();

        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }
}
