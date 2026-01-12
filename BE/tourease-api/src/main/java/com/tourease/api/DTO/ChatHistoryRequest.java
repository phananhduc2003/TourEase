package com.tourease.api.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatHistoryRequest {
    private Integer userID;
    private String userMessage;
    private String botMessage;
    private String botType;  
    private String tours; 
}