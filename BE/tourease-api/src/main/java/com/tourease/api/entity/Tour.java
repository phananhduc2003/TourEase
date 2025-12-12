package com.tourease.api.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @CollectionTable(name = "tour_images")
    @Column(name = "image_url")
    private List<String> images;
    
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TourStartDate> startDates;
    
    private Integer quantity;
    private Double priceAdult;
    private Double priceChild;
    private String duration;
    private String destination;
    private Boolean availability;
    private LocalDate startDate;
    private LocalDate endDate;
    
    @Column(name = "departure_location")
    private String departureLocation;  
    
    @Column(name = "transportation")
    private String transportation; 
    
    // Relationships
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Booking> bookings;
    
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Review> reviews;
    
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Promotion> promotions;
    
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("dayNumber ASC")
    private List<ItineraryDay> itineraryDays;
    
    // Business methods
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
        if ("adult".equalsIgnoreCase(ageGroup)) {
            return this.priceAdult;
        } else if ("child".equalsIgnoreCase(ageGroup)) {
            return this.priceChild;
        }
        return 0.0;
    }
    
    public void addItineraryDay(ItineraryDay day) {
        day.setTour(this);
        this.itineraryDays.add(day);
    }

    public String getTourName() {
        return this.title;
    }



    
}
