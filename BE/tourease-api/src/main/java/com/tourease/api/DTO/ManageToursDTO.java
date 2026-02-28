package com.tourease.api.DTO;

import java.time.LocalDate;
import java.util.List;

import com.tourease.api.Enum.BookingStatus;
import com.tourease.api.Enum.PaymentMethod;
import com.tourease.api.Enum.PaymentStatus;
import com.tourease.api.entity.TourStartDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ManageToursDTO {
	@Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
	public static class TourResponse{
		private Integer tourID;
		private String tourCode;
		private String title;
		private String destination;
		private String departureLocation;  
		private String duration;
		private String transportation; 
		private Integer quantity;
		private Boolean availability;
		private Double priceAdult;
		private Double priceChild;
		private List<TourStartDate> startDates;
	}
}
