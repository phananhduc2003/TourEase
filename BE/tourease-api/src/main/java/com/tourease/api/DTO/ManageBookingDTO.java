package com.tourease.api.DTO;

import java.time.LocalDate;

import com.tourease.api.Enum.BookingStatus;
import com.tourease.api.Enum.PaymentMethod;
import com.tourease.api.Enum.PaymentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ManageBookingDTO {
	@Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BookingResponse{
		private Integer bookingID;
		private LocalDate bookingDate;
		private Integer numAdults;
	    
	    private Integer numChildren;

	    private Double  totalPrice;

	    private PaymentStatus paymentStatus;  

	    private BookingStatus bookingStatus;     

	    private String contactName;
	    
	    private String contactEmail;
	    
	    private String contactPhone;
	    
	    private String contactAddress;
	    
	    private PaymentMethod paymentMethod; 
	}
}
