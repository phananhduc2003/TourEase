package com.tourease.api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Images {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer imageID;

    private String imageUrl;

    private String description;

    @ManyToOne
    @JoinColumn(name = "tour_id", nullable = false)
    private Tour tour;

    // Các phương thức bổ sung

    public String viewImage() {
        return imageUrl;
    }

    public void updateDescription(String newDescription) {
        this.description = newDescription;
    }
}
