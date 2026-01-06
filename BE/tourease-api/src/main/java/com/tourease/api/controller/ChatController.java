package com.tourease.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tourease.api.DTO.ChatRequest;
import com.tourease.api.DTO.ChatResponse;
import com.tourease.api.service.ChatService;

@RestController
@RequestMapping("/api/public/chatbot")
@CrossOrigin(origins= "*")
public class ChatController {
	@Autowired
	private ChatService chatService;
	
	@PostMapping
	public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
		String answer = chatService.handleMessage(request.getMessage());
        return ResponseEntity.ok(new ChatResponse(answer));
	}
}
