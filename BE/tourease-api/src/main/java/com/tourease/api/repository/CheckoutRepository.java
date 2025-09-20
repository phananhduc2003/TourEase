package com.tourease.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.Checkout;




@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Integer> {
	 @Query("SELECT c FROM Checkout c WHERE c.transactionID = :transactionId")
	 Optional<Checkout> findByTransactionID(@Param("transactionId") String transactionId);
}
