package com.tourease.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.Tour;


@Repository
public interface TourRepository extends JpaRepository<Tour, Integer> {

}
