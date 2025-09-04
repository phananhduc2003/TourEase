package com.tourease.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.tourease.api.entity.Tour;
import com.tourease.api.repository.TourRepository;

@Service
public class TourService {
	
	@Autowired
	private TourRepository tourRepository;
	
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
	
	
	
	/**
	 * Lấy danh sách destinations có sẵn
	 */
	public List<String> getAvailableDestinations() {
		return tourRepository.findDistinctDestinations();
	}
	
	
}
