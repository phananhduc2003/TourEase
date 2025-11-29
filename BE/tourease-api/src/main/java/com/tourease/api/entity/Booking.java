package com.tourease.api.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookingID;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;
    
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDate bookingDate;

    private Integer numAdults;
    
    private Integer numChildren;

    private Double  totalPrice;

    private String paymentStatus;

    private String bookingStatus;

    private String specialRequests;
    
    @Column(name = "contact_name")
    private String contactName;
    
    @Column(name = "contact_email")
    private String contactEmail;
    
    @Column(name = "contact_phone")
    private String contactPhone;
    
    @Column(name = "contact_address")
    private String contactAddress;

    // Quan hệ khác (nếu cần)
    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    @JsonIgnore
    private Invoice invoice;
    
    @JsonIgnore
    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Checkout checkout;

 // Các phương thức bổ sung
    public Double calculateTotalPrice() {
        if (tour != null) {
            Double adultPrice = numAdults * tour.getPriceAdult();
            Double childPrice = (numChildren != null ? numChildren : 0) * tour.getPriceChild();
            this.totalPrice = adultPrice + childPrice;
        }
        return this.totalPrice;
    }

    public void updatePaymentStatus(String status) {
        this.paymentStatus = status;
    }

    public void updateBookingStatus(String status) {
        this.bookingStatus = status;
    }
    
    // Validate thông tin liên lạc
    public boolean isContactInfoComplete() {
        return contactName != null && !contactName.trim().isEmpty() &&
               contactEmail != null && !contactEmail.trim().isEmpty() &&
               contactPhone != null && !contactPhone.trim().isEmpty();
    }
}
