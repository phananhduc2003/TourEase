package com.tourease.api.service;

import org.springframework.stereotype.Service;

import com.tourease.api.repository.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
