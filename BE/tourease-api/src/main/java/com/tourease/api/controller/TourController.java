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
import com.tourease.api.service.TourService;

@RestController
@RequestMapping("/api/public/tours")
@CrossOrigin(origins = "*")
public class TourController {
	
	@Autowired
	private TourService tourService;
	
	@GetMapping("/latest")
	public ResponseEntity<List<Tour>> getLatestTours() {
		try {
			List<Tour> tours = tourService.getLatestTours();
			
			if (tours.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
			
			return ResponseEntity.ok(tours);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@GetMapping("/popular")
	public ResponseEntity<List<Tour>> getPopularTours() {
		try {
			List<Tour> tours = tourService.getPopularTours();
			
			if(tours.isEmpty()) {
				return ResponseEntity.noContent().build();
			}
			return ResponseEntity.ok(tours);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}