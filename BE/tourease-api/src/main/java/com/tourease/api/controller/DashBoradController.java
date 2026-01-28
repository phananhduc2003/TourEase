package com.tourease.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tourease.api.DTO.DashBoardDTO;
import com.tourease.api.service.DashBoradService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth/dashboard")
@CrossOrigin(origins = "*")

public class DashBoradController {
	@Autowired
	private DashBoradService dashBoradService;
	
	@GetMapping("/revenue")
	public ResponseEntity<List<DashBoardDTO.RevenueData>> getRevenue(@RequestParam(defaultValue = "week") String timeRange) {
		
        List<DashBoardDTO.RevenueData> data = dashBoradService.getRevenueData(timeRange);
        
        return ResponseEntity.ok(data);
	}
	
	@GetMapping("/top-tours")
	public ResponseEntity<List<DashBoardDTO.TopTourData>> getTopTours(@RequestParam(defaultValue = "5") Integer limit) {
		
		List<DashBoardDTO.TopTourData> data = dashBoradService.getTopTours(limit);
		
		return ResponseEntity.ok(data);
				
	}
	
	@GetMapping("/status")
	public ResponseEntity<List<DashBoardDTO.BookingStatusData>> getBookingStatus() {
		List<DashBoardDTO.BookingStatusData> data = dashBoradService.getBookingStatusData();
		return ResponseEntity.ok(data);
	}
	
	@GetMapping("/stats-overview")
	public ResponseEntity<DashBoardDTO.StatsOverview> getStatsOverview() {
		DashBoardDTO.StatsOverview data = dashBoradService.getStatsOverview();
		return ResponseEntity.ok(data);
		
	}
	
	
}
