package com.tourease.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.ItineraryDay;

@Repository
public interface ItineraryDayRepository extends JpaRepository<ItineraryDay, Integer> {
    
    @Modifying
    @Query("DELETE FROM ItineraryDay d WHERE d.tour.tourID = :tourId")
    void deleteByTourId(@Param("tourId") Integer tourId);
}