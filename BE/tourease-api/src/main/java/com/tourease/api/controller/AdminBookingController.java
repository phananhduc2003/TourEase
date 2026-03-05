package com.tourease.api.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tourease.api.DTO.ManageBookingDTO;
import com.tourease.api.service.BookingService;

@RestController
@RequestMapping("/api/admin/bookings")
@CrossOrigin(origins = "*")
public class AdminBookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public ResponseEntity<List<ManageBookingDTO.BookingResponse>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBooking());
    }
}