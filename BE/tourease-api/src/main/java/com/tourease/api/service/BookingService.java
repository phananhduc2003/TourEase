package com.tourease.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tourease.api.DTO.ManageBookingDTO;
import com.tourease.api.entity.Booking;
import com.tourease.api.repository.BookingRepository;

@Service
public class BookingService {
	@Autowired
	private  BookingRepository bookingRepository;
	
	public List<Booking> getBookingsByUserId(Integer userID) {
		return bookingRepository.findByUser_UserID(userID);
	}
	
	public List<ManageBookingDTO.BookingResponse> getAllBooking() {
		 return bookingRepository.findAll()
	    		.stream()
	    		.map(b -> new ManageBookingDTO.BookingResponse(
	                    b.getBookingID(),
	                    b.getBookingDate(),
	                    b.getNumAdults(),
	                    b.getNumChildren(),
	                    b.getTotalPrice(),
	                    b.getPaymentStatus(),
	                    b.getBookingStatus(),
	                    b.getContactName(),
	                    b.getContactEmail(),
	                    b.getContactPhone(),
	                    b.getContactAddress(),
	                    b.getCheckout() != null 
	                        ? b.getCheckout().getPaymentMethod() 
	                        : null
	            ))
	            .toList();
	    			
	}
}
