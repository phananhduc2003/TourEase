	package com.tourease.api.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tourease.api.DTO.ManageUsersDTO;
import com.tourease.api.service.UserService;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "*")
public class AdminUserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<ManageUsersDTO.UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    
    @DeleteMapping("/{userID}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userID) {
        userService.deleteUser(userID);
        return ResponseEntity.noContent().build(); 
    }


    @PatchMapping("/{userID}/status")
    public ResponseEntity<ManageUsersDTO.UserResponse> updateUserStatus(
            @PathVariable Integer userID,
            @RequestBody ManageUsersDTO.UpdateStatusRequest request) {
        return ResponseEntity.ok(userService.updateUserStatus(userID, request.getStatus()));
    }
}