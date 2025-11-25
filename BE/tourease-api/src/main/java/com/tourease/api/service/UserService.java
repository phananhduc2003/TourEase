package com.tourease.api.service;

import org.springframework.stereotype.Service;

import com.tourease.api.DTO.ProfileUserDTO;
import com.tourease.api.DTO.ProfileUserResponseDTO;
import com.tourease.api.entity.User;
import com.tourease.api.repository.UserRepository;

@Service
public class UserService {
	private final UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
	
	
	public ProfileUserResponseDTO getInforProfileUser(Integer userID) {
		User user = userRepository.findById(userID)
				.orElseThrow(() -> new RuntimeException("User not found"));
		
		ProfileUserResponseDTO response = new ProfileUserResponseDTO();
	    response.setFullName(user.getFullName());
	    response.setEmail(user.getEmail());
	    response.setAddress(user.getAddress());
	    response.setPhoneNumber(user.getPhoneNumber());
	    
	    return response;
	}
	
	public User updateProfileUser(Integer userID, ProfileUserDTO  profileUserDTO) {
		User user = userRepository.findById(userID)
				.orElseThrow(() -> new RuntimeException("User not found"));
		
		user.setFullName(profileUserDTO.getFullName());
		user.setAddress(profileUserDTO.getAddress());
		user.setEmail(profileUserDTO.getEmail());
		user.setPhoneNumber(profileUserDTO.getPhoneNumber());
		
		return userRepository.save(user);
				
	}
}
