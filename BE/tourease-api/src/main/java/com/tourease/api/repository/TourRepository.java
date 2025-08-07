package com.tourease.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.Tour;


@Repository
public interface TourRepository extends JpaRepository<Tour, Integer> {
	/**
     * Alternative: Lấy ra tours mới nhất
     */
	Page<Tour> findByAvailabilityTrueOrderByTourIDDesc(Pageable pageable);
}
