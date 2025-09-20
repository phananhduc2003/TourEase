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
				.tourId(tour.getTourID())
				.title(tour.getTitle())
				.startDate(tour.getStartDate())
				.endDate(tour.getEndDate())
				.priceAdult(tour.getPriceAdult())
				.priceChild(tour.getPriceChild())
				.defaultAdults(1)
				.defaultChildren(0)
				.defaultTotalPrice(defaultTotalPrice)
				.build();
	}
	
	/**
	 * Lấy danh sách destinations có sẵn
	 */
	public List<String> getAvailableDestinations() {
		return tourRepository.findDistinctDestinations();
	}
	
	
	public List<Tour> getLatestTours() {
		Pageable pageable = PageRequest.of(0, 8);
		Page<Tour> tourPage = tourRepository.findByAvailabilityTrueOrderByTourIDDesc(pageable);
		return tourPage.getContent(); //getContent() sẽ trả về danh sách các phần tử trong trang hiện tại dưới dạng List<Tour>
	}
	
	/**
     * Lấy ra 6 tour được booking nhiều nhất và CONFIRMED nhiều nhất
     */
	public List<Tour> getPopularTours() {
		return tourRepository.findPopularTours();
	}
	
	
	/**
	 * Map sortBy parameter sang field name thực tế
	 */
	private String getSortField(String sortBy) {
		switch (sortBy.toLowerCase()) {
			case "price":
				return "priceAdult";
			case "title":
				return "title";
			case "destination":
				return "destination";
			case "duration":
				return "duration";
			case "date":
				return "startDate";
			default:
				return "tourID"; // Default sort by ID
		}
	}
	

	/**
	 * Lấy tours với filtering và pagination
	 */
	public Page<Tour> getToursWithFilters(int page, int size, List<String> destinations, 
            Double minPrice, Double maxPrice, 
            String sortBy, String sortDir) {

		// Tạo Sort object
		Sort sort = Sort.by(Sort.Direction.fromString(sortDir), getSortField(sortBy));

		// Tạo Pageable với sort
		Pageable pageable = PageRequest.of(page, size, sort);
		
		List<String> finalDestinations = (destinations == null || destinations.isEmpty()) ? null : destinations;

		// Gọi repository với filters
		return tourRepository.findToursWithFilters(finalDestinations, minPrice, maxPrice, pageable);
	}
	
}
