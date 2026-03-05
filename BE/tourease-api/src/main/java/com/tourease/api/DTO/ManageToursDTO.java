package com.tourease.api.DTO;

import java.time.LocalDate;
import java.util.List;

import com.tourease.api.Enum.BookingStatus;
import com.tourease.api.Enum.PaymentMethod;
import com.tourease.api.Enum.PaymentStatus;
import com.tourease.api.entity.TourStartDate;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ManageToursDTO {

	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class TourDetailResponse {
	    private Integer tourID;
	    private String title;
	    private String description;
	    private String tourCode;
	    private Integer quantity;
	    private Double priceAdult;
	    private Double priceChild;
	    private String duration;
	    private String destination;
	    private String departureLocation;
	    private String transportation;
	    private Boolean availability;
	    private List<String> images;
	    private List<String> startDates;
	    private List<ItineraryDayDTO> itineraryDays;

	    @Data
	    @Builder
	    @NoArgsConstructor
	    @AllArgsConstructor
	    public static class ItineraryDayDTO {
	        private Integer dayNumber;
	        private String title;
	    }
	}

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
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class ItineraryDayRequest {
	    private Integer dayNumber;
	    private String title;

	}
	
	@Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateTourRequest {
        @NotBlank(message = "Tiêu đề không được để trống")
        private String title;

        private String description;
        private String tourCode;
        private Integer quantity;
        private Double priceAdult;
        private Double priceChild;
        private String duration;
        private String destination;
        private String departureLocation;
        private String transportation;
        private Boolean availability;
        private List<LocalDate> startDates;
        private List<String> images;
        private List<ItineraryDayRequest> itineraryDays;
        
    }
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	public static class UpdateTourRequest {
	    private String title;
	    private String description;
	    private String tourCode;
	    private Integer quantity;
	    private Double priceAdult;
	    private Double priceChild;
	    private String duration;
	    private String destination;
	    private String departureLocation;
	    private String transportation;
	    private Boolean availability;
	    private List<String> images;
	    private List<ItineraryDayRequest> itineraryDays;
	    private List<LocalDate> startDates;
	}
	

	

}
