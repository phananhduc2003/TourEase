package com.tourease.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tourease.api.DTO.ManageToursDTO;
import com.tourease.api.entity.Tour;
import com.tourease.api.exception.ResourceNotFoundException;
import com.tourease.api.service.TourService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/tours")
@CrossOrigin(origins = "*")
public class AdminTourController {

    @Autowired
    private TourService tourService;


    @GetMapping
    public ResponseEntity<List<ManageToursDTO.TourResponse>> getAllTours() {
        return ResponseEntity.ok(tourService.getAllTours());
    }
    
    @GetMapping("/{tourID}")
    public ResponseEntity<ManageToursDTO.TourDetailResponse> getTourById(
            @PathVariable Integer tourID) {

        return ResponseEntity.ok(tourService.getTourDetail(tourID));
    }

    @PostMapping
    public ResponseEntity<Tour> createTour(@RequestBody @Valid ManageToursDTO.CreateTourRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tourService.createTour(request));
    }
    
    @PutMapping("/{tourId}")
    public ResponseEntity<Tour> updateTour(@PathVariable Integer tourId, @RequestBody ManageToursDTO.UpdateTourRequest request) {
    	return ResponseEntity.ok(tourService.updateTour(tourId, request)); 
    }
    
    @DeleteMapping("/{tourId}")
    public  ResponseEntity<Tour> deleteTour(@PathVariable Integer tourId) {
    	return ResponseEntity.ok(tourService.deleteTour(tourId));
    }
}
