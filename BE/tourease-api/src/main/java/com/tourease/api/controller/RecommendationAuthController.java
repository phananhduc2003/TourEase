package com.tourease.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tourease.api.entity.Tour;
import com.tourease.api.service.RecommendationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth/recommend")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class RecommendationAuthController {

    private final RecommendationService recommendationService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Tour>> getRecommendForUser(@PathVariable Integer userId) {
        List<Tour> tours = recommendationService.getRecommendedToursForUser(userId);
        return ResponseEntity.ok(tours);
    }
}