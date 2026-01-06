package com.tourease.api.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "chat_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;
    
    @Column(name = "sender", nullable = false, length = 10)
    private String sender; 
    
    @Column(name = "message", columnDefinition = "TEXT", nullable = false)
    private String message;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}