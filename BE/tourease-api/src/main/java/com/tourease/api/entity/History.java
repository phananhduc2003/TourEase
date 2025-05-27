package com.tourease.api.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "histories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer historyID;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String tourID;

    private String actionType;

    private LocalDateTime timestamp;

    // Các phương thức theo sơ đồ ERD

    public void recordAction(String tourID, String actionType) {
        this.tourID = tourID;
        this.actionType = actionType;
        this.timestamp = LocalDateTime.now();
    }
}
