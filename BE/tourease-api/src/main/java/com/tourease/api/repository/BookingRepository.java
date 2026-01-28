package com.tourease.api.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.Booking;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByUser_UserID(Integer userId);
    
    /**
     * Tính tổng doanh thu từ các booking đã thanh toán thành công
     */
    @Query("""
    		SELECT SUM(b.totalPrice)
    		FROM Booking b
    		WHERE b.paymentStatus = com.tourease.api.Enum.PaymentStatus.SUCCESS
    		""")
    		Double calculateTotalRevenue();

    /**
     * Đếm tổng số booking
     */
    @Query("SELECT COUNT(b) FROM Booking b")
    Integer countAllBookings();
    
    /**
     * Lấy doanh thu theo khoảng thời gian
     * 
     * @param startDate Ngày bắt đầu
     * @param endDate Ngày kết thúc
     * @return List<Object[]> với [bookingDate, totalRevenue, countBookings]
     */
    @Query("""
    		SELECT b.bookingDate, SUM(b.totalPrice), COUNT(b)
    		FROM Booking b
    		WHERE b.bookingDate BETWEEN :startDate AND :endDate
    		AND b.paymentStatus = com.tourease.api.Enum.PaymentStatus.SUCCESS
    		GROUP BY b.bookingDate
    		ORDER BY b.bookingDate ASC
    		""")
    		List<Object[]> findRevenueByDateRange(
    		    @Param("startDate") LocalDate startDate,
    		    @Param("endDate") LocalDate endDate
    		);
    
    /**
     * Lấy top tours phổ biến nhất
     * Trả về: [tourName, countBookings, totalRevenue]
     */
    @Query("SELECT t.title, COUNT(b), SUM(b.totalPrice) " +
            "FROM Booking b " +
            "JOIN b.tour t " +
            "WHERE b.paymentStatus = com.tourease.api.Enum.PaymentStatus.SUCCESS " +
            "GROUP BY t.tourID, t.title " +
            "ORDER BY COUNT(b) DESC")
    List<Object[]> findTopTours(Pageable pageable);
    
    /**
     * Đếm số lượng booking theo trạng thái
     * Trả về: [bookingStatus, count]
     */
    @Query("SELECT b.bookingStatus, COUNT(b) " +
           "FROM Booking b " +
           "GROUP BY b.bookingStatus")
    List<Object[]> countByBookingStatus();

}