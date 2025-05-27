package com.tourease.api.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "checkouts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Checkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer checkoutID;

    @OneToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    private String paymentMethod;     // Ví dụ: "VNPAY"

    private LocalDateTime paymentDate;

    private Double amount;

    private String paymentStatus;     // Ví dụ: "Pending", "Success", "Failed"

    private String transactionID;     // Mã giao dịch bạn tạo ra (vnp_TxnRef)

    private String transactionNo;     // Mã giao dịch do VNPAY sinh ra (sandbox)

    // Các phương thức bổ sung
    public void updatePaymentStatus(String status) {
        this.paymentStatus = status;
    }

    public String getPaymentDetail() {
        return "Transaction ID: " + transactionID +
               ", Transaction No: " + transactionNo +
               ", Method: " + paymentMethod +
               ", Status: " + paymentStatus;
    }
}
