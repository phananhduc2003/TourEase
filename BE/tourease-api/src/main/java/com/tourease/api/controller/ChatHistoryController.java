package com.tourease.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.tourease.api.DTO.ChatHistoryRequest;
import com.tourease.api.entity.ChatHistory;
import com.tourease.api.service.ChatHistoryService;

import java.util.List;

@RestController
@RequestMapping("/api/auth/chat-history")
@CrossOrigin(origins = "*")
public class ChatHistoryController {

    @Autowired
    private ChatHistoryService chatHistoryService;

    @GetMapping("/{userID}")
    public ResponseEntity<List<ChatHistory>> getChatHistory(
            @PathVariable Integer userID,
            Authentication authentication) {
        
        String currentUsername = authentication.getName();
        List<ChatHistory> history = chatHistoryService.getChatHistory(userID, currentUsername);
        return ResponseEntity.ok(history);
    }

    @PostMapping
    public ResponseEntity<?> saveChatMessage(
            @RequestBody ChatHistoryRequest request,
            Authentication authentication) {
        
        String currentUsername = authentication.getName();
        
        chatHistoryService.saveChatMessages(
            request.getUserID(), 
            request.getUserMessage(), 
            request.getBotMessage(),
            currentUsername
        );
        
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userID}")
    public ResponseEntity<?> clearChatHistory(
            @PathVariable Integer userID,
            Authentication authentication) {
        
        String currentUsername = authentication.getName();
        chatHistoryService.clearChatHistory(userID, currentUsername);
        return ResponseEntity.ok().build();
    }
}