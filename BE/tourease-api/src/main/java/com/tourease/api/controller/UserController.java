package com.tourease.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tourease.api.DTO.ProfileUserDTO;
import com.tourease.api.DTO.ProfileUserResponseDTO;
import com.tourease.api.entity.User;
import com.tourease.api.service.UserService;

@RestController
@RequestMapping("/api/auth/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile/{userID}")
    public ResponseEntity<ProfileUserResponseDTO> getProfileUser(@PathVariable int userID) {
        return ResponseEntity.ok(userService.getInforProfileUser(userID));
    }

    @PutMapping("/profile/{userID}")
    public ResponseEntity<User> updateProfileUser(@PathVariable int userID, 
                                                   @RequestBody ProfileUserDTO profileUserDTO) {
        return ResponseEntity.ok(userService.updateProfileUser(userID, profileUserDTO));
    }
}