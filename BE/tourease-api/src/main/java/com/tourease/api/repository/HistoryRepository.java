package com.tourease.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.History;



@Repository
public interface HistoryRepository extends JpaRepository<History, Integer> {

}
