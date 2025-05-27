package com.tourease.api.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

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
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDate bookingDate;

    private Integer numAdults;

    private Double  totalPrice;

    private String paymentStatus;

    private String bookingStatus;

    private String specialRequests;

    // Quan hệ khác (nếu cần)
    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Invoice invoice;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Checkout checkout;

    // Các phương thức bổ sung theo sơ đồ
    public Double calculateTotalPrice() {
        // Logic tính toán giá trị tổng
        return Double.valueOf(totalPrice);
    }

    public void updatePaymentStatus(String status) {
        this.paymentStatus = status;
    }

    public void updateBookingStatus(String status) {
        this.bookingStatus = status;
    }
}
