package com.tourease.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.Checkout;




@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Integer> {

}
