package com.tourease.api.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import com.tourease.api.Enum.PaymentMethod;
import com.tourease.api.Enum.PaymentStatus;

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

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;     // Ví dụ: "VNPAY"

    private LocalDateTime paymentDate;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;     // Ví dụ: "Pending", "Success", "Failed"

    private String transactionID;     // Mã giao dịch bạn tạo ra (vnp_TxnRef)

    private String transactionNo;     // Mã giao dịch do VNPAY sinh ra (sandbox)
    
    private String responseCode; // Mã phản hồi từ VNPAY

    private String bankCode; // Mã ngân hàng (nếu có)
    
    private String paymentInfo;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

 // Các phương thức bổ sung
    public void updatePaymentStatus(PaymentStatus status) {
        this.paymentStatus = status;
        this.updatedAt = LocalDateTime.now();
    }

    public String getPaymentDetail() {
        return "Transaction ID: " + transactionID +
               ", Transaction No: " + transactionNo +
               ", Method: " + paymentMethod +
               ", Status: " + paymentStatus;
    }
    
    public boolean isPaymentSuccess() {
        return PaymentStatus.SUCCESS.equals(this.paymentStatus);
    }
}