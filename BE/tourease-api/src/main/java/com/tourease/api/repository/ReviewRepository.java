package com.tourease.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.Review;


@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

}
