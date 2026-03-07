package com.tourease.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tourease.api.DTO.ManageUsersDTO;
import com.tourease.api.DTO.ProfileUserDTO;
import com.tourease.api.DTO.ProfileUserResponseDTO;
import com.tourease.api.entity.User;
import com.tourease.api.entity.User.UserStatus;
import com.tourease.api.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private  UserRepository userRepository;
	
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
	
	public List<ManageUsersDTO.UserResponse> getAllUsers() {
		return userRepository.findAll()
				.stream()
				.map(u -> new ManageUsersDTO.UserResponse(
							u.getUserID(),
							u.getFullName(),
							u.getUserName(),
							u.getEmail(),
							u.getPhoneNumber(),
							u.getRole(),
							u.getIsActive(),
							u.getStatus(),
							u.getProvider(),
							u.getCreateDate()
						))
				.toList();
	}
	
	public void deleteUser(Integer userID) {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userID));

      
        if (user.getRole() == User.Role.ADMIN) {
            throw new RuntimeException("Cannot delete ADMIN account");
        }

        userRepository.delete(user);
    }


    public ManageUsersDTO.UserResponse updateUserStatus(Integer userID, UserStatus newStatus) {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userID));

        
        if (user.getRole() == User.Role.ADMIN) {
            throw new RuntimeException("Cannot block ADMIN account");
        }

        user.setStatus(newStatus);
        User saved = userRepository.save(user);

        return new ManageUsersDTO.UserResponse(
                saved.getUserID(),
                saved.getFullName(),
                saved.getUserName(),
                saved.getEmail(),
                saved.getPhoneNumber(),
                saved.getRole(),
                saved.getIsActive(),
                saved.getStatus(),
                saved.getProvider(),
                saved.getCreateDate()
        );
    }
	
}
