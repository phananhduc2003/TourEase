package com.tourease.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.Tour;


@Repository
public interface TourRepository extends JpaRepository<Tour, Integer> {
	
	
	/**
     * Alternative: Lấy ra tours mới nhất
     */
	Page<Tour> findByAvailabilityTrueOrderByTourIDDesc(Pageable pageable);
	
	/**
     * Tìm ra 6 tour được booking nhiều nhất và có status CONFIRMED nhiều nhất
     * Sắp xếp theo số lượng booking CONFIRMED giảm dần
     */
	@Query(value = """
		    SELECT t.* FROM tours t
		    LEFT JOIN (
		        SELECT b.tour_id, 
		               COUNT(*) as total_bookings,
		               COUNT(CASE WHEN b.booking_status = 'CONFIRMED' THEN 1 END) as confirmed_bookings
		        FROM bookings b 
		        GROUP BY b.tour_id
		    ) booking_stats ON t.tourID = booking_stats.tour_id
		    WHERE t.availability = true
		    ORDER BY booking_stats.confirmed_bookings DESC, booking_stats.total_bookings DESC
		    LIMIT 6
		    """, nativeQuery = true)
    List<Tour> findPopularTours();
	
	/**
     * Tìm tours với các filters
     */
	@Query("SELECT t FROM Tour t WHERE t.availability = true " +
		       "AND (:destinations IS NULL OR t.destination IN :destinations) " +
		       "AND (:minPrice IS NULL OR t.priceAdult >= :minPrice) " +
		       "AND (:maxPrice IS NULL OR t.priceAdult <= :maxPrice)")
	    Page<Tour> findToursWithFilters(
	        @Param("destinations") List<String> destinations,
	        @Param("minPrice") Double minPrice, 
	        @Param("maxPrice") Double maxPrice,
	        Pageable pageable
	    );
    
    /**
     * Lấy danh sách các destination có sẵn (để tạo options cho filter)
     */
    @Query("SELECT DISTINCT t.destination FROM Tour t WHERE t.availability = true AND t.destination IS NOT NULL")
    List<String> findDistinctDestinations();
}
