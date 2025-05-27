package com.tourease.api.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "invoices")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer invoiceID;

    @OneToOne
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    private Double amount;

    private LocalDate dateIssued;

    private String details;

    // Phương thức bổ sung theo sơ đồ ERD

    public void generateInvoice() {
        // Logic tạo hóa đơn
        this.dateIssued = LocalDate.now();
    }

    public String viewInvoice() {
        // Logic hiển thị thông tin hóa đơn
        return details;
    }
}