package com.tourease.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.tourease.api.entity.Tour;
import com.tourease.api.repository.TourRepository;


import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationService {

    private final TourRepository tourRepository;
    private final RestTemplate restTemplate;

    @Value("${ml.service.url:http://localhost:8000}")
    private String mlServiceUrl;

    public List<Tour> getSimilarTours(Integer tourId) {
        try {
            String url = mlServiceUrl + "/recommend/similar/" + tourId;
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

            if (response.getBody() == null) return List.of();

            List<Integer> similarIds = (List<Integer>) response.getBody().get("similarTourIds");
            if (similarIds == null || similarIds.isEmpty()) return List.of();

            return tourRepository.findAllById(similarIds);

        } catch (Exception e) {
            log.error("Lỗi khi gọi ML service similar tours: {}", e.getMessage());
            return List.of();
        }
    }

    public List<Tour> getRecommendedToursForUser(Integer userId) {
        try {
            String url = mlServiceUrl + "/recommend/user/" + userId;
            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

            if (response.getBody() == null) return List.of();

            List<Integer> recommendedIds = (List<Integer>) response.getBody().get("recommendedTourIds");
            if (recommendedIds == null || recommendedIds.isEmpty()) return List.of();

            return tourRepository.findAllById(recommendedIds);

        } catch (Exception e) {
            log.error("Lỗi khi gọi ML service recommend user: {}", e.getMessage());
            return List.of();
        }
    }
}