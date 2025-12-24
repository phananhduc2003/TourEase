package com.tourease.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tourease.api.DTO.TourOrderedResponse;
import com.tourease.api.DTO.TourPageResponse;
import com.tourease.api.entity.Tour;
import com.tourease.api.exception.ResourceNotFoundException;
import com.tourease.api.service.TourService;

@RestController
@RequestMapping("/api/public/tours")
@CrossOrigin(origins = "*")
public class TourController {
	
	@Autowired
	private TourService tourService;
	
	@GetMapping("/{tourID}")
	public ResponseEntity<Tour> getTourById(@PathVariable("tourID") Integer tourID) {
		Optional<Tour> tour = tourService.getTourById(tourID);
		
		if(tour.isEmpty()) {
			throw new ResourceNotFoundException("Khong tim thay Tour");
		}
		
		return ResponseEntity.ok(tour.get());
	}
	
	@GetMapping("/{tourID}/tour-odered")
	public ResponseEntity<TourOrderedResponse> getTourOrderedInfo(@PathVariable("tourID") Integer tourID) {
		
		TourOrderedResponse tour = tourService.getTourOrderedInfo(tourID);
		
		return ResponseEntity.ok(tour);
	}
	
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
	
	@GetMapping("/filter")
	public ResponseEntity<TourPageResponse> getAllTours(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "9") int size,
			@RequestParam(required = false) List<String> destinations,
			@RequestParam(required = false) List<String> departureLocations,
			@RequestParam(required = false) List<String> transportations,
			@RequestParam(required = false) Double minPrice,
			@RequestParam(required = false) Double maxPrice,
			@RequestParam(defaultValue = "tourID") String sortBy,
			@RequestParam(defaultValue = "asc") String sortDir) {
			
			Page<Tour> tourPage = tourService.getToursWithFilters(
				page, size, destinations,departureLocations,transportations , minPrice, maxPrice, sortBy, sortDir
			);
			
			TourPageResponse response = TourPageResponse.builder()
				.tours(tourPage.getContent())
				.currentPage(tourPage.getNumber())
				.totalPages(tourPage.getTotalPages())
				.totalElements(tourPage.getTotalElements())
				.size(tourPage.getSize())
				.first(tourPage.isFirst())
				.last(tourPage.isLast())
				.build();
				
			return ResponseEntity.ok(response);
			
	}
	
	/**
	 * API để lấy danh sách các destination có sẵn cho filter
	 */
	@GetMapping("/destinations")
	public ResponseEntity<List<String>> getAvailableDestinations() {

			List<String> destinations = tourService.getAvailableDestinations();
			return ResponseEntity.ok(destinations);	
	}
	
	@GetMapping("/departureLocations")
	public ResponseEntity<List<String>> getAvailableDepartureLocations() {
		
		List<String> departureLocations = tourService.getAvailableDepartureLocation();
		return ResponseEntity.ok(departureLocations);
	}
	
	@GetMapping("/transportations")
	public ResponseEntity<List<String>> getAvailableTransportation() {
		
		List<String> transportations = tourService.getAvailableTransportation();
		return ResponseEntity.ok(transportations);
	}
	
}