package com.tourease.api.service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tourease.api.DTO.CheckoutRequest;
import com.tourease.api.Enum.PaymentStatus;
import com.tourease.api.entity.Booking;
import com.tourease.api.entity.Checkout;
import com.tourease.api.entity.Tour;
import com.tourease.api.entity.User;
import com.tourease.api.exception.ResourceNotFoundException;
import com.tourease.api.repository.BookingRepository;
import com.tourease.api.repository.CheckoutRepository;
 
import com.tourease.api.repository.TourRepository;
import com.tourease.api.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CheckoutService {

	private final BookingRepository bookingRepository;
    private final CheckoutRepository checkoutRepository;
    private final TourRepository tourRepository;
    private final UserRepository userRepository;
    private final VNPayService vnPayService;
    
    @Transactional
    public Booking createBookingFromCheckout(CheckoutRequest request, Integer userId) {
        log.info("Tạo booking mới cho user: {}, tour: {}", userId, request.getTourId());
        
        // 1. Tìm tour
        Tour tour = tourRepository.findById(request.getTourId())
            .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tour với ID: " + request.getTourId()));
        
        // 2. Tìm user
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user với ID: " + userId));
        
        // 3. Tạo booking mới
        Booking booking = Booking.builder()
                .bookingDate(LocalDate.now())
                .numAdults(request.getNumAdults())
                .numChildren(request.getNumChildren())
                .paymentStatus("PENDING")
                .bookingStatus("PENDING")
                .specialRequests(request.getSpecialRequests())
                // Thông tin liên lạc
                .contactName(request.getContactName())
                .contactEmail(request.getContactEmail())
                .contactPhone(request.getContactPhone())
                .contactAddress(request.getContactAddress())
                .tour(tour)
                .user(user)
                .build();
        
        // 4. Tính tổng tiền
        booking.calculateTotalPrice();
        
        // 5. Validate amount
        if (booking.getTotalPrice() == null || booking.getTotalPrice() <= 0) {
            throw new IllegalArgumentException("Giá tour không hợp lệ");
        }
        
        // 6. Lưu booking
        booking = bookingRepository.save(booking);
        
        log.info("Đã tạo booking với ID: {}, Total Price: {}", booking.getBookingID(), booking.getTotalPrice());
        return booking;
    }
    
    /**
     * Bước 2: Tạo checkout record
     */
    @Transactional
    public Checkout createCheckout(Booking booking, CheckoutRequest request) {
        log.info("Tạo checkout cho booking ID: {}", booking.getBookingID());
        
        // Tạo transaction ID unique
        String transactionID = "TXN_" + System.currentTimeMillis() + "_" + booking.getBookingID();
        
        Checkout checkout = Checkout.builder()
                .booking(booking)
                .paymentMethod(request.getPaymentMethod())
                .amount(booking.getTotalPrice())
                .paymentStatus(PaymentStatus.PENDING)
                .transactionID(transactionID)
                .paymentInfo("Thanh toán cho tour: " + booking.getTour().getTourName())
                .build();
        
        checkout = checkoutRepository.save(checkout);
        
        log.info("Đã tạo checkout với ID: {}, TransactionID: {}, Amount: {}", 
                checkout.getCheckoutID(), checkout.getTransactionID(), checkout.getAmount());
        
        return checkout;
    }
    
    /**
     * Bước 3: Xử lý thanh toán dựa trên phương thức
     */
    public String processPayment(Checkout checkout) {
        log.info("Xử lý thanh toán cho checkout ID: {} với phương thức: {}", 
                checkout.getCheckoutID(), checkout.getPaymentMethod());
        
        switch (checkout.getPaymentMethod()) {
            case OFFICE_PAYMENT:
                return processOfficePayment(checkout);
            case VNPAY:
                return processVNPayPayment(checkout);
            default:
                throw new IllegalArgumentException("Phương thức thanh toán không được hỗ trợ");
        }
    }
    
    /**
     * Xử lý thanh toán tại văn phòng
     */
    private String processOfficePayment(Checkout checkout) {
        log.info("Xử lý thanh toán tại văn phòng cho checkout: {}", checkout.getCheckoutID());
        
        checkout.updatePaymentStatus(PaymentStatus.PENDING);
        checkout.setPaymentInfo("Vui lòng thanh toán tại văn phòng trong vòng 24h");
        
        checkoutRepository.save(checkout);
        
        return "Đặt tour thành công! Vui lòng thanh toán tại văn phòng trong vòng 24h.";
    }
    
    /**
     * Xử lý thanh toán VNPay - tạo URL redirect đến VNPay Sandbox
     */
    private String processVNPayPayment(Checkout checkout) {
        log.info("Tạo VNPay payment URL cho checkout: {}, Amount: {}", 
                checkout.getCheckoutID(), checkout.getAmount());
        
        // Validate amount trước khi tạo VNPay URL
        if (checkout.getAmount() == null || checkout.getAmount() <= 0) {
            throw new IllegalArgumentException("Số tiền thanh toán không hợp lệ: " + checkout.getAmount());
        }
        
        try {
            String vnpayUrl = vnPayService.createPaymentUrl(checkout);
            
            // Update checkout info
            checkout.setPaymentInfo("Redirect to VNPay for payment");
            checkoutRepository.save(checkout);
            
            return vnpayUrl;
        } catch (UnsupportedEncodingException e) {
            log.error("Lỗi encoding khi tạo VNPay URL: ", e);
            throw new RuntimeException("Không thể tạo link thanh toán VNPay");
        }
    }
    
    /**
     * Tìm checkout theo ID
     */
    public Checkout findCheckoutById(Integer checkoutId) {
        return checkoutRepository.findById(checkoutId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy checkout với ID: " + checkoutId));
    }
    
    /**
     * Tìm checkout theo transaction ID
     */
    public Checkout findCheckoutByTransactionId(String transactionId) {
        return checkoutRepository.findByTransactionID(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy checkout với Transaction ID: " + transactionId));
    }
    
    /**
     * Update payment status
     */
    @Transactional
    public void updatePaymentStatus(Integer checkoutId, PaymentStatus status, String transactionNo) {
        Checkout checkout = findCheckoutById(checkoutId);
        checkout.updatePaymentStatus(status);
        checkout.setTransactionNo(transactionNo);
        
        // Update booking payment status
        Booking booking = checkout.getBooking();
        booking.updatePaymentStatus(status.name());
        
        if (status == PaymentStatus.SUCCESS) {
            booking.updateBookingStatus("CONFIRMED");
        }
        
        checkoutRepository.save(checkout);
        bookingRepository.save(booking);
        
        log.info("Đã update payment status cho checkout: {} thành {}", checkoutId, status);
    }
    
    /**
     * Update payment status by transaction ID
     */
    @Transactional
    public void updatePaymentStatusByTransactionId(String transactionId, PaymentStatus status, String transactionNo) {
        Checkout checkout = findCheckoutByTransactionId(transactionId);
        checkout.updatePaymentStatus(status);
        checkout.setTransactionNo(transactionNo);
        
        // Update booking payment status
        Booking booking = checkout.getBooking();
        booking.updatePaymentStatus(status.name());
        
        if (status == PaymentStatus.SUCCESS) {
            booking.updateBookingStatus("CONFIRMED");
        }
        
        checkoutRepository.save(checkout);
        bookingRepository.save(booking);
        
        log.info("Đã update payment status cho transaction: {} thành {}", transactionId, status);
    }
}
