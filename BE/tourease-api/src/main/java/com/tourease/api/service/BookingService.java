package com.tourease.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tourease.api.entity.Booking;
import com.tourease.api.repository.BookingRepository;

@Service
public class BookingService {
	@Autowired
	private  BookingRepository bookingRepository;
	
	public List<Booking> getBookingsByUserId(Integer userID) {
		return bookingRepository.findByUser_UserID(userID);
	}
	
}
