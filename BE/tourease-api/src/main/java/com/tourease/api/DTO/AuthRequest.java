package com.tourease.api.DTO;

import lombok.Data;

@Data
public class AuthRequest {
	private String userName;
    private String password;
}
