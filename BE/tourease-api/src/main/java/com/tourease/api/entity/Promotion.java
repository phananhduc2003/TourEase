package com.tourease.api.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "promotions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer promotionID;

    private String description;

    private Double discount;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer quantity;

    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    // Các phương thức bổ sung theo sơ đồ ERD
    public void applyPromotion() {
        // logic áp dụng khuyến mãi
    }

    public void updatePromotion() {
        // logic cập nhật khuyến mãi
    }
}

