package com.tourease.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.tourease.api.DTO.ManageToursDTO;
import com.tourease.api.DTO.TourOrderedResponse;
import com.tourease.api.entity.ItineraryDay;
import com.tourease.api.entity.Tour;
import com.tourease.api.entity.TourStartDate;
import com.tourease.api.exception.ResourceNotFoundException;
import com.tourease.api.repository.ItineraryDayRepository;
import com.tourease.api.repository.TourRepository;
import com.tourease.api.repository.TourStartDateRepository;

import jakarta.transaction.Transactional;

@Service
public class TourService {
	
	@Autowired
	private TourRepository tourRepository;
	
	@Autowired
	private TourStartDateRepository tourStartDateRepository;

	@Autowired
	private ItineraryDayRepository itineraryDayRepository;
	
	public Optional<Tour> getTourById(Integer tourID) {
		return tourRepository.findById(tourID);
	}
	
	public ManageToursDTO.TourDetailResponse getTourDetail(Integer tourID) {
	    Tour tour = tourRepository.findById(tourID)
	        .orElseThrow(() -> new RuntimeException("Tour not found: " + tourID));

	    List<String> images = tourRepository.findByIdWithImages(tourID)
	        .map(Tour::getImages)
	        .orElse(List.of());

	    List<String> startDates = tourRepository.findByIdWithStartDates(tourID)
	        .map(t -> t.getStartDates().stream()
	            .map(sd -> sd.getStartDate().toString())
	            .sorted()
	            .collect(Collectors.toList()))
	        .orElse(List.of());

	    List<ManageToursDTO.TourDetailResponse.ItineraryDayDTO> itineraryDays =
	        tourRepository.findByIdWithItineraryDays(tourID)
	            .map(t -> t.getItineraryDays().stream()
	                .map(d -> ManageToursDTO.TourDetailResponse.ItineraryDayDTO.builder()
	                    .dayNumber(d.getDayNumber())
	                    .title(d.getTitle())
	                    .build())
	                .collect(Collectors.toList()))
	            .orElse(List.of());

	    return ManageToursDTO.TourDetailResponse.builder()
	        .tourID(tour.getTourID())
	        .title(tour.getTitle())
	        .description(tour.getDescription())
	        .tourCode(tour.getTourCode())
	        .quantity(tour.getQuantity())
	        .priceAdult(tour.getPriceAdult())
	        .priceChild(tour.getPriceChild())
	        .duration(tour.getDuration())
	        .destination(tour.getDestination())
	        .departureLocation(tour.getDepartureLocation())
	        .transportation(tour.getTransportation())
	        .availability(tour.getAvailability())
	        .images(images)
	        .startDates(startDates)
	        .itineraryDays(itineraryDays)
	        .build();
	}

	public List<ManageToursDTO.TourResponse> getAllTours() {
	    return tourRepository.findAll()
	            .stream()
	            .map(t -> new ManageToursDTO.TourResponse(
	                    t.getTourID(),
	                    t.getTourCode(),
	                    t.getTitle(),
	                    t.getDestination(),
	                    t.getDepartureLocation(),
	                    t.getDuration(),
	                    t.getTransportation(),
	                    t.getQuantity(),
	                    t.getAvailability(),  
	                    t.getPriceAdult(),     
	                    t.getPriceChild(), 
	                    t.getStartDates()
	            ))
	            .collect(Collectors.toList()); // ← fix: đổi từ .toList()
	}

	public TourOrderedResponse getTourOrderedInfo(Integer tourId) {
		Tour tour = tourRepository.findById(tourId)
				.orElseThrow(() -> new ResourceNotFoundException("khong tim thay ID: " + tourId));
		
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

	public Page<Tour> getToursWithFilters(int page, int size, List<String> destinations,
			List<String> departureLocations, List<String> transportations,
            Double minPrice, Double maxPrice, 
            String sortBy, String sortDir) {

		Sort sort = Sort.by(Sort.Direction.fromString(sortDir), getSortField(sortBy));
		Pageable pageable = PageRequest.of(page, size, sort);
		
		List<String> finalDestinations = (destinations == null || destinations.isEmpty()) ? null : destinations;
		List<String> finaldepartureLocations = (departureLocations == null || departureLocations.isEmpty()) ? null : departureLocations;
		List<String> finaltransportations = (transportations == null || transportations.isEmpty()) ? null : transportations;

		return tourRepository.findToursWithFilters(finalDestinations, finaldepartureLocations, finaltransportations, minPrice, maxPrice, pageable);
	}
	
	public Tour createTour(ManageToursDTO.CreateTourRequest request) {
		Tour tour = Tour.builder()
				.title(request.getTitle())
				.description(request.getDescription())
				.tourCode(request.getTourCode())
				.quantity(request.getQuantity())
				.priceAdult(request.getPriceAdult())
				.priceChild(request.getPriceChild())
				.duration(request.getDuration())
				.destination(request.getDestination())
				.departureLocation(request.getDepartureLocation())
				.transportation(request.getTransportation())
				.availability(request.getAvailability())
				.images(new ArrayList<>(request.getImages() != null ? request.getImages() : List.of()))
				.build();
		
		if (request.getStartDates() != null && !request.getStartDates().isEmpty()) {
	        List<TourStartDate> startDates = request.getStartDates().stream()
	                .map(date -> {
	                    TourStartDate tsd = new TourStartDate();
	                    tsd.setStartDate(date);
	                    tsd.setTour(tour); 
	                    return tsd;
	                })
	                .collect(Collectors.toList()); 
	        tour.setStartDates(startDates);
	    }
		
	    if (request.getItineraryDays() != null && !request.getItineraryDays().isEmpty()) {
	        List<ItineraryDay> days = request.getItineraryDays().stream()
	                .map(d -> ItineraryDay.builder()
	                        .dayNumber(d.getDayNumber())
	                        .title(d.getTitle())
	                        .tour(tour)
	                        .build())
	                .collect(Collectors.toList()); 
	        tour.setItineraryDays(days);
	    }

	    return tourRepository.save(tour);
	}
	
	@Transactional
	public Tour updateTour(Integer tourId, ManageToursDTO.UpdateTourRequest request) {
	    Tour tour = tourRepository.findById(tourId)
	            .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tour ID: " + tourId));

	    if (request.getTitle() != null) tour.setTitle(request.getTitle());
	    if (request.getDescription() != null) tour.setDescription(request.getDescription());
	    if (request.getTourCode() != null) tour.setTourCode(request.getTourCode());
	    if (request.getQuantity() != null) tour.setQuantity(request.getQuantity());
	    if (request.getPriceAdult() != null) tour.setPriceAdult(request.getPriceAdult());
	    if (request.getPriceChild() != null) tour.setPriceChild(request.getPriceChild());
	    if (request.getDuration() != null) tour.setDuration(request.getDuration());
	    if (request.getDestination() != null) tour.setDestination(request.getDestination());
	    if (request.getDepartureLocation() != null) tour.setDepartureLocation(request.getDepartureLocation());
	    if (request.getTransportation() != null) tour.setTransportation(request.getTransportation());
	    if (request.getAvailability() != null) tour.setAvailability(request.getAvailability());
	    if (request.getImages() != null) tour.setImages(new ArrayList<>(request.getImages()));

	    if (request.getStartDates() != null) {
	        tourStartDateRepository.deleteByTourId(tourId);

	        List<TourStartDate> newDates = request.getStartDates().stream()
	                .map(date -> {
	                    TourStartDate tsd = new TourStartDate();
	                    tsd.setStartDate(date);
	                    tsd.setTour(tour);
	                    return tsd;
	                })
	                .collect(Collectors.toList()); 
	        tour.setStartDates(newDates);
	    }

	    if (request.getItineraryDays() != null) {
	        itineraryDayRepository.deleteByTourId(tourId);

	        List<ItineraryDay> newDays = request.getItineraryDays().stream()
	                .map(d -> ItineraryDay.builder()
	                        .dayNumber(d.getDayNumber())
	                        .title(d.getTitle())
	                        .tour(tour)
	                        .build())
	                .collect(Collectors.toList());
	        tour.setItineraryDays(newDays);
	    }

	    return tourRepository.save(tour);
	}
	
	public Tour deleteTour(Integer tourId) {
		Tour tour = tourRepository.findById(tourId)
				 .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tour ID: " + tourId));
		tour.setAvailability(false);
		return tourRepository.save(tour);
	}
}