package com.tourease.api.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.tourease.api.Enum.BookingStatus;
import com.tourease.api.Enum.PaymentMethod;
import com.tourease.api.Enum.PaymentStatus;
import com.tourease.api.entity.User.ActiveStatus;
import com.tourease.api.entity.User.Role;
import com.tourease.api.entity.User.UserStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ManageUsersDTO {
	@Data
	@Builder
    @NoArgsConstructor
    @AllArgsConstructor
	public static class UserResponse {
		  	private Integer userID;
		  	private String fullName;
		    private String userName;
		    private String email;
		    private String phoneNumber;
		    private Role role;
		    private ActiveStatus isActive;
		    private UserStatus status;
		    private String provider;
		    private LocalDateTime createDate;
		   
	}
	
	@Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateStatusRequest {
        private UserStatus status; 
    }
}
