package com.tourease.api.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.tourease.api.DTO.DashBoardDTO;
import com.tourease.api.Enum.BookingStatus;
import com.tourease.api.repository.BookingRepository;
import com.tourease.api.repository.TourRepository;
import com.tourease.api.repository.UserRepository;



@Service

public class DashBoradService {
	@Autowired
	private  BookingRepository bookingRepository;
	
	@Autowired
	private TourRepository tourRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	/**
     * Lấy tổng quan thống kê
     */
    public DashBoardDTO.StatsOverview getStatsOverview() {
        Double totalRevenue = bookingRepository.calculateTotalRevenue();
        Integer totalBookings = bookingRepository.countAllBookings();
        Integer activeTours = tourRepository.countActiveTours();
        Integer totalUsers = userRepository.countAllUsers();

        return DashBoardDTO.StatsOverview.builder()
                .totalRevenue(totalRevenue != null ? totalRevenue : 0.0)
                .totalBookings(totalBookings != null ? totalBookings : 0)
                .activeTours(activeTours != null ? activeTours : 0)
                .totalUsers(totalUsers != null ? totalUsers : 0)
                .build();
    }
	
	public List<DashBoardDTO.RevenueData> getRevenueData(String timeRange){
		 // Bước 1: Tính startDate, endDate dựa vào timeRange
        LocalDate endDate = LocalDate.now();
        LocalDate startDate;
        
        switch (timeRange.toLowerCase()) {
            case "week":
                startDate = endDate.minusDays(7);
                break;
            case "month":
                startDate = endDate.minusMonths(1);
                break;
            case "year":
                startDate = endDate.minusYears(1);
                break;
            default:
                startDate = endDate.minusDays(7);
        }
        
     
        List<Object[]> results = bookingRepository.findRevenueByDateRange(startDate, endDate);
        

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM");
        
        return results.stream()
            .map(row -> DashBoardDTO.RevenueData.builder()
                .date(((LocalDate) row[0]).format(formatter))  
                .revenue(((Number) row[1]).doubleValue())      
                .bookings(((Number) row[2]).intValue())        
                .build())
            .collect(Collectors.toList());
    }
	
	public List<DashBoardDTO.TopTourData> getTopTours(Integer limit) {

	    if (limit == null || limit <= 0) {
	        limit = 5;
	    }

	    Pageable pageable = PageRequest.of(0, limit);

	    List<Object[]> results = bookingRepository.findTopTours(pageable);

	    return results.stream()
	            .map(row -> DashBoardDTO.TopTourData.builder()
	                    .tourName((String) row[0])
	                    .bookings(((Number) row[1]).intValue())
	                    .revenue(((Number) row[2]).doubleValue())
	                    .build())
	            .collect(Collectors.toList());
	}
	
	 public List<DashBoardDTO.BookingStatusData> getBookingStatusData() {
	        List<Object[]> results = bookingRepository.countByBookingStatus();

	        Map<String, String> statusColors = Map.of(
	        		 "PENDING", "#FFA726",    
	        		 "CONFIRMED", "#29B6F6",   
	        		 "COMPLETED", "#66BB6A",   
	        		 "CANCELLED", "#EF5350"
	        );

	        return results.stream()
	        		 .map(row -> {
	        	            BookingStatus status = (BookingStatus) row[0]; 
	        	            return DashBoardDTO.BookingStatusData.builder()
	        	                    .status(status.name())                 
	        	                    .value(((Number) row[1]).intValue())
	        	                    .color(statusColors.getOrDefault(status.name(), "#9e9e9e"))
	        	                    .build();
	        	        })
	                .collect(Collectors.toList());
	    }

	
}
