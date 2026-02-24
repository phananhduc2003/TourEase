package com.tourease.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.tourease.api.DTO.ManageBookingDTO;
import com.tourease.api.entity.Booking;
import com.tourease.api.service.BookingService;

@RestController
@RequestMapping("/api/auth/booking")
public class BookingController {
	@Autowired
	private BookingService bookingService;
	
	@GetMapping("/{userID}")
	public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable Integer userID){
		List<Booking> bookings = bookingService.getBookingsByUserId(userID);
		return ResponseEntity.ok(bookings);
	}
	
	@GetMapping("/manage-booking")
	public ResponseEntity<List<ManageBookingDTO.BookingResponse>> getAllBookings() {
		List<ManageBookingDTO.BookingResponse> data = bookingService.getAllBooking();
		return ResponseEntity.ok(data);
				
	}
}


