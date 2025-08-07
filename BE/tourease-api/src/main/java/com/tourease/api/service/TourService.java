package com.tourease.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
}
