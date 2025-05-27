package com.tourease.api.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

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

    @Column(unique = true, nullable = false)
    private String userName;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    private String phoneNumber;

    private String address;

    private String ipAddress;

    @Enumerated(EnumType.STRING)
    private ActiveStatus isActive;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDateTime createDate;

    private LocalDateTime updateDate;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Chat> chats;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<History> histories;

    public void register() {
        this.createDate = LocalDateTime.now();
        this.isActive = ActiveStatus.Y;
    }

    public enum ActiveStatus {
        N, Y
    }

    public enum UserStatus {
        B, D
    }

    public enum Role {
        USER, ADMIN
    }

    public boolean validateLogin(String username, String password) {
        return this.userName.equals(username) && this.password.equals(password);
    }

    public void updateUserDetails(String email, String phoneNumber, String address) {
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }

    public String getUserRole() {
        return role.name();
    }
}