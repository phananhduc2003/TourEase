package com.tourease.api.DTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TourOrderedResponse {
	private Integer tourId;
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private Double priceAdult;
    private Double priceChild;
    
    // Thông tin mặc định để frontend hiển thị ban đầu
    private Integer defaultAdults;
    private Integer defaultChildren;
    private Double defaultTotalPrice;
}
