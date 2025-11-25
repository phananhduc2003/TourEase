package com.tourease.api.DTO;

import lombok.Data;

@Data
public class ProfileUserResponseDTO {
	private String fullName;
	private String address;
	private String email;
	private String phoneNumber;
}
