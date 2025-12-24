package com.tourease.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.tourease.api.DTO.TourOrderedResponse;
import com.tourease.api.entity.Tour;
import com.tourease.api.exception.ResourceNotFoundException;
import com.tourease.api.repository.TourRepository;

@Service
public class TourService {
	
	@Autowired
	private TourRepository tourRepository;
	
	public Optional<Tour> getTourById(Integer tourID) {
		return tourRepository.findById( tourID );
	}
	
	
	public TourOrderedResponse getTourOrderedInfo(Integer tourId) {
		Tour tour = tourRepository.findById(tourId)
				.orElseThrow(() -> new ResourceNotFoundException("khong tim tahy ID: " + tourId));
		
		
		if (!tour.getAvailability()) {
			throw new ResourceNotFoundException("Tour khong ton tai");
		}
		
		Double defaultTotalPrice = tour.getPriceAdult() * 1 + tour.getPriceChild() * 0;
		
		return TourOrderedResponse.builder()
				.tourCode(tour.getTourCode())
				.tourId(tour.getTourID())
				.title(tour.getTitle())
				.transportation(tour.getTransportation())
				.departureLocation(tour.getDepartureLocation())
				.duration(tour.getDuration())
				.images(tour.getImages())
				.priceAdult(tour.getPriceAdult())
				.priceChild(tour.getPriceChild())
				.defaultAdults(1)
				.defaultChildren(0)
				.defaultTotalPrice(defaultTotalPrice)
				.build();
	}
	
	public List<String> getAvailableDestinations() {
		return tourRepository.findDistinctDestinations();
	}
	
	public List<String> getAvailableDepartureLocation() {
		return tourRepository.findDistinctDepartureLocations();
	}
	
	public List<String> getAvailableTransportation() {
		return tourRepository.findDistinctTransportations();
	}
	
	
	public List<Tour> getLatestTours() {
		Pageable pageable = PageRequest.of(0, 8);
		Page<Tour> tourPage = tourRepository.findByAvailabilityTrueOrderByTourIDDesc(pageable);
		return tourPage.getContent(); 
	}
	
	
	public List<Tour> getPopularTours() {
		return tourRepository.findPopularTours();
	}

	private String getSortField(String sortBy) {
		switch (sortBy.toLowerCase()) {
		case "price":
        case "priceadult":        
            return "priceAdult";
        case "title":
            return "title";
        case "destination":
            return "destination";
        case "duration":
            return "duration";
        case "date":
        case "startdate":         
            return "startDate";
        default:
            return "tourID";      
		}
	}
	

	/**
	 * Lấy tours với filtering và pagination
	 */
	public Page<Tour> getToursWithFilters(int page, int size, List<String> destinations,
			List<String> departureLocations, List<String> transportations,
            Double minPrice, Double maxPrice, 
            String sortBy, String sortDir) {

		
		Sort sort = Sort.by(Sort.Direction.fromString(sortDir), getSortField(sortBy));

		
		Pageable pageable = PageRequest.of(page, size, sort);
		
		List<String> finalDestinations = (destinations == null || destinations.isEmpty()) ? null : destinations;
		
		List<String> finaldepartureLocations = (departureLocations == null || departureLocations.isEmpty()) ? null : departureLocations;
		
		List<String> finaltransportations = (transportations == null || transportations.isEmpty()) ? null : transportations;

	
		return tourRepository.findToursWithFilters(finalDestinations,finaldepartureLocations,finaltransportations, minPrice, maxPrice, pageable);
	}
	
}
