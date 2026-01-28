package com.tourease.api.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class DashBoardDTO {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatsOverview {
        private Double totalRevenue;     
        private Integer totalBookings;    
        private Integer activeTours;      
        private Integer totalUsers;       
    }
	
	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class RevenueData {
		private String date;
		private Double revenue;
		private Integer bookings;
		
	}
	
	@Data
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class TopTourData {
		private String tourName;
		private Integer bookings ;
		private Double revenue ;
	}
	

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BookingStatusData {
        private String status;       
        private Integer value;        
        private String color;         
    }
    
    

}
