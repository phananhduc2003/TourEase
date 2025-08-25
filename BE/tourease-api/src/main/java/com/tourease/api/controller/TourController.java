package com.tourease.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tourease.api.entity.Tour;
import com.tourease.api.exception.ResourceNotFoundException;
import com.tourease.api.service.TourService;

@RestController
@RequestMapping("/api/public/tours")
@CrossOrigin(origins = "*")
public class TourController {
	
	@Autowired
	private TourService tourService;
	
	@GetMapping("/latest")
	public ResponseEntity<List<Tour>> getLatestTours() {
		
			List<Tour> tours = tourService.getLatestTours();
			
			if (tours.isEmpty()) {
	            throw new ResourceNotFoundException("Không có tour nào mới");
	        }

	        return ResponseEntity.ok(tours);
		
	}
	
	@GetMapping("/popular")
	public ResponseEntity<List<Tour>> getPopularTours() {
		
			List<Tour> tours = tourService.getPopularTours();
			
			if(tours.isEmpty()) {
	            throw new ResourceNotFoundException("Không có tour phổ biến nào");
	        }

	        return ResponseEntity.ok(tours);
	}
}