package com.tourease.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    @Column(name = "user_name", unique = true, nullable = false)
    private String userName;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;
    
    @Column(name = "full_name")
    private String fullName;

    @Column(name = "ip_address")
    private String ipAddress;
    
    @Column(name = "provider")
    private String provider; // GOOGLE, FACEBOOK, LOCAL

    @Column(name = "provider_id")
    private String providerId;

    @Enumerated(EnumType.STRING)
    @Column(name = "is_active")
    private ActiveStatus isActive;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private UserStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @Column(name = "create_date")
    private LocalDateTime createDate;

    @Column(name = "update_date")
    private LocalDateTime updateDate;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Booking> bookings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Review> reviews;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Chat> chats;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<History> histories;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<ChatHistory> chatHistories;

    public enum ActiveStatus {
        N, Y
    }

    public enum UserStatus {
        B, D
    }

    public enum Role {
        USER, ADMIN
    }
}