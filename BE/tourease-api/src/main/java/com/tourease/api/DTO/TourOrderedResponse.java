package com.tourease.api.DTO;



import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TourOrderedResponse {
	private String tourCode;
	private Integer tourId;
    private String title;
    private Double priceAdult;
    private Double priceChild;
    private String transportation;
    private String departureLocation;
    private String duration;
    private List<String> images;
    
    // Thông tin mặc định để frontend hiển thị ban đầu
    private Integer defaultAdults;
    private Integer defaultChildren;
    private Double defaultTotalPrice;
}
