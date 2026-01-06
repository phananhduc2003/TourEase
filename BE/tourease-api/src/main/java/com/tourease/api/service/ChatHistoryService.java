package com.tourease.api.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tourease.api.entity.ChatHistory;
import com.tourease.api.entity.User;
import com.tourease.api.exception.ResourceNotFoundException;
import com.tourease.api.repository.ChatHistoryRepository;
import com.tourease.api.repository.UserRepository;

@Service
public class ChatHistoryService {

    @Autowired
    private ChatHistoryRepository chatHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    public List<ChatHistory> getChatHistory(Integer userID, String currentUsername) {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.getUserName().equals(currentUsername)) {
            throw new UnsupportedOperationException("You don't have permission to view this chat history");
        }

        return chatHistoryRepository.findByUserUserIDOrderByCreatedAtAsc(userID);
    }

    @Transactional
    public void saveChatMessages(Integer userID, String userMessage, String botMessage, String currentUsername) {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.getUserName().equals(currentUsername)) {
            throw new UnsupportedOperationException("You don't have permission to save chat");
        }

        ChatHistory userChat = ChatHistory.builder()
                .user(user)
                .sender("user")
                .message(userMessage)
                .createdAt(LocalDateTime.now())
                .build();
        chatHistoryRepository.save(userChat);

        ChatHistory botChat = ChatHistory.builder()
                .user(user)
                .sender("bot")
                .message(botMessage)
                .createdAt(LocalDateTime.now())
                .build();
        chatHistoryRepository.save(botChat);
    }

    @Transactional
    public void clearChatHistory(Integer userID, String currentUsername) {
        User user = userRepository.findById(userID)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.getUserName().equals(currentUsername)) {
            throw new UnsupportedOperationException("You don't have permission to clear chat history");
        }

        chatHistoryRepository.deleteByUserUserID(userID);
    }
}