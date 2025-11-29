package com.tourease.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tourease.api.DTO.ProfileUserDTO;
import com.tourease.api.DTO.ProfileUserResponseDTO;
import com.tourease.api.entity.User;
import com.tourease.api.service.UserService;

@RestController
@RequestMapping("/api/auth/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@GetMapping("/profile-user/{userID}")
	public ResponseEntity<ProfileUserResponseDTO> getProfileUser(@PathVariable int userID) {
		return ResponseEntity.ok(userService.getInforProfileUser(userID));
	}
	
	@PutMapping("/update-profile-user/{userID}")
	public ResponseEntity<User> updateProfileUser(@PathVariable int userID, @RequestBody ProfileUserDTO profileUserDTO) {
		
		return ResponseEntity.ok(userService.updateProfileUser(userID, profileUserDTO));
		
	}
}
