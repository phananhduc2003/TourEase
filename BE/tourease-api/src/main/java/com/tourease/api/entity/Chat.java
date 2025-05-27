package com.tourease.api.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chats")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer chatID;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Dùng chung cho cả Admin và User

    private String messages;

    private Boolean readStatus;

    private LocalDateTime createdDate;

    private String ipAddress;

    // Các phương thức theo ERD
    public void sendMessage(String message) {
        this.messages = message;
        this.createdDate = LocalDateTime.now();
        this.readStatus = false;
    }

    public void receiveMessage() {
        this.readStatus = true;
    }

    public String viewChatHistory() {
        return messages;
    }
}
