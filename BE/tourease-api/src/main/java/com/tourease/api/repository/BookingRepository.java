package com.tourease.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.Booking;




@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

}
