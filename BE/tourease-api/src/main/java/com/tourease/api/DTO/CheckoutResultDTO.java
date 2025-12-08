package com.tourease.api.DTO;

import java.time.LocalDate;

import com.tourease.api.entity.Booking;
import com.tourease.api.entity.Checkout;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CheckoutResultDTO {
	private Booking booking;
    private Checkout checkout;
    private String paymentResult;
}
