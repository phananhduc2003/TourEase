package com.tourease.api.DTO;

import lombok.Data;

@Data
public class RegisterRequest {
    private String userName;
    private String password;
    private String email;
    private String phoneNumber;
    private String address;
}