package com.tourease.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tourease.api.entity.Tour;
import com.tourease.api.service.RecommendationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/public/recommend")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    // Public - không cần JWT
    // Dùng cho trang chi tiết tour
    @GetMapping("/similar/{tourId}")
    public ResponseEntity<List<Tour>> getSimilarTours(@PathVariable Integer tourId) {
        List<Tour> tours = recommendationService.getSimilarTours(tourId);
        return ResponseEntity.ok(tours);
    }
}