package com.tourease.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.Promotion;


@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Integer> {

}
