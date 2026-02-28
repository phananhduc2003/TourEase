package com.tourease.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tourease.api.DTO.ManageToursDTO;
import com.tourease.api.service.TourService;

@RestController
@RequestMapping("/api/auth/")
@CrossOrigin(origins = "*")
public class AuthTourController {
	
	@Autowired
	private TourService tourService;
	
	@GetMapping("/manage-tours")
	public ResponseEntity<List<ManageToursDTO.TourResponse>> getAllTours() {
		List<ManageToursDTO.TourResponse> data = tourService.getAllTours();
		return ResponseEntity.ok(data);
	}

}
