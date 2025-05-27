package com.tourease.api.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "tours")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tourID;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    private List<String> images;

    private Integer quantity;

    private Double priceAdult;

    private Double priceChild;

    private String duration;

    private String destination;

    private Boolean availability;

    @ElementCollection
    private List<String> itinerary;

    private LocalDate startDate;

    private LocalDate endDate;
 // Relationships
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL)
    private List<Booking> bookings;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL)
    private List<Images> tourImages;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL)
    private List<Promotion> promotions;
    
    // Các phương thức bổ sung

    public void updateDetails() {
        // Logic cập nhật thông tin chi tiết của tour
    }

    public void manageAvailability() {
        // Logic quản lý tình trạng còn chỗ của tour
    }

    public void manageReviews() {
        // Logic quản lý đánh giá tour
    }

    public Double calculatePrice(String ageGroup) {
        // Logic tính giá tour dựa trên nhóm tuổi
        return 0.0;
    }

    public List<String> getItinerary() {
        return itinerary;
    }
    
}
