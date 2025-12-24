package com.tourease.api.service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tourease.api.DTO.CheckoutRequest;
import com.tourease.api.DTO.CheckoutResultDTO;
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
    
    @Transactional(rollbackFor = Exception.class)
    public CheckoutResultDTO processCompleteCheckout(CheckoutRequest request, Integer userId) {
        log.info("Bắt đầu xử lý checkout cho user: {}, tour: {}", userId, request.getTourId());
        
        try {
            // 1. Validate input trước khi tạo bất cứ thứ gì
            validateCheckoutRequest(request, userId);
            
            // 2. Tạo booking (chưa commit)
            Booking booking = createBookingInternal(request, userId);
            
            // 3. Tạo checkout (chưa commit)
            Checkout checkout = createCheckoutInternal(booking, request);
            
            // 4. Xử lý thanh toán (nếu lỗi ở đây → rollback hết)
            String paymentResult = processPayment(checkout);
            
            // 5. Chỉ commit khi mọi thứ OK
            log.info("Checkout thành công - BookingID: {}, CheckoutID: {}", 
                    booking.getBookingID(), checkout.getCheckoutID());
            
            return CheckoutResultDTO.builder()
                    .booking(booking)
                    .checkout(checkout)
                    .paymentResult(paymentResult)
                    .build();
                    
        } catch (Exception e) {
            log.error("Lỗi trong quá trình checkout, sẽ rollback toàn bộ: ", e);
            throw e; // Throw để Spring rollback transaction
        }
    }
    
    // VALIDATE 
    private void validateCheckoutRequest(CheckoutRequest request, Integer userId) {
        log.info("Validating checkout request...");
        
        // Check tour tồn tại
        Tour tour = tourRepository.findById(request.getTourId())
            .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy tour với ID: " + request.getTourId()));
        
        // Check user tồn tại
        userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user với ID: " + userId));
        
        // Validate số lượng người
        if (request.getNumAdults() <= 0) {
            throw new IllegalArgumentException("Số lượng người lớn phải lớn hơn 0");
        }
        
        if (request.getNumChildren() < 0) {
            throw new IllegalArgumentException("Số lượng trẻ em không được âm");
        }
        
        // Validate thông tin liên lạc
        if (request.getContactName() == null || request.getContactName().trim().isEmpty()) {
            throw new IllegalArgumentException("Tên người liên hệ không được để trống");
        }
        
        if (request.getContactEmail() == null || !request.getContactEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("Email không hợp lệ");
        }
        
        if (request.getContactPhone() == null || !request.getContactPhone().matches("^[0-9]{10,11}$")) {
            throw new IllegalArgumentException("Số điện thoại không hợp lệ (phải 10-11 số)");
        }
        
      
        log.info("Validation passed!");
    }
    
    // Tạo Booking (không @Transactional - sẽ dùng transaction của method cha)
    private Booking createBookingInternal(CheckoutRequest request, Integer userId) {
        log.info("Tạo booking cho user: {}, tour: {}", userId, request.getTourId());
        
        Tour tour = tourRepository.findById(request.getTourId()).get();
        User user = userRepository.findById(userId).get();
        
        Booking booking = Booking.builder()
                .bookingDate(LocalDate.now())
                .startDates(request.getStartDates())
                .departureLocation(request.getDepartureLocation())
                .transportation(request.getTransportation())
                .numAdults(request.getNumAdults())
                .numChildren(request.getNumChildren())
                .paymentStatus("PENDING")
                .bookingStatus("PENDING")
                .specialRequests(request.getSpecialRequests())
                .contactName(request.getContactName())
                .contactEmail(request.getContactEmail())
                .contactPhone(request.getContactPhone())
                .contactAddress(request.getContactAddress())
                .tour(tour)
                .user(user)
                .build();
        
        booking.calculateTotalPrice();
        
        // Double check giá
        if (booking.getTotalPrice() == null || booking.getTotalPrice() <= 0) {
            throw new IllegalArgumentException("Giá tour không hợp lệ sau khi tính toán");
        }
        
        booking = bookingRepository.save(booking);
        log.info("Đã tạo booking với ID: {}, Total: {}", booking.getBookingID(), booking.getTotalPrice());
        
        return booking;
    }
    
    private Checkout createCheckoutInternal(Booking booking, CheckoutRequest request) {
        log.info("Tạo checkout cho booking ID: {}", booking.getBookingID());
        
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
        
        log.info("Đã tạo checkout với ID: {}, TransactionID: {}", 
                checkout.getCheckoutID(), checkout.getTransactionID());
        
        return checkout;
    }
    
    // Xử lý thanh toán
    public String processPayment(Checkout checkout) {
        log.info("Xử lý thanh toán cho checkout ID: {} với phương thức: {}", 
                checkout.getCheckoutID(), checkout.getPaymentMethod());
        
        switch (checkout.getPaymentMethod()) {
            case OFFICE_PAYMENT:
                return processOfficePayment(checkout);
            case VNPAY:
                return processVNPayPayment(checkout);
            default:
                throw new IllegalArgumentException("Phương thức thanh toán không được hỗ trợ: " + checkout.getPaymentMethod());
        }
    }
    
    private String processOfficePayment(Checkout checkout) {
        checkout.updatePaymentStatus(PaymentStatus.PENDING);
        checkout.setPaymentInfo("Vui lòng thanh toán tại văn phòng trong vòng 24h");
        checkoutRepository.save(checkout);
        return "Đặt tour thành công! Vui lòng thanh toán tại văn phòng trong vòng 24h.";
    }
    
    private String processVNPayPayment(Checkout checkout) {
        log.info("Tạo VNPay payment URL cho checkout: {}, Amount: {}", 
                checkout.getCheckoutID(), checkout.getAmount());
        
        if (checkout.getAmount() == null || checkout.getAmount() <= 0) {
            throw new IllegalArgumentException("Số tiền thanh toán không hợp lệ: " + checkout.getAmount());
        }
        
        try {
            String vnpayUrl = vnPayService.createPaymentUrl(checkout);
            checkout.setPaymentInfo("Redirect to VNPay for payment");
            checkoutRepository.save(checkout);
            return vnpayUrl;
        } catch (UnsupportedEncodingException e) {
            log.error("Lỗi encoding khi tạo VNPay URL: ", e);
            throw new RuntimeException("Không thể tạo link thanh toán VNPay", e);
        }
    }
    
    // Payment callback handlers
    @Transactional
    public void updatePaymentStatusByTransactionId(String transactionId, PaymentStatus status, String transactionNo) {
        Checkout checkout = checkoutRepository.findByTransactionID(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy checkout với Transaction ID: " + transactionId));
        
        // Idempotency check
        if (checkout.getPaymentStatus() != PaymentStatus.PENDING) {
            log.warn("Checkout {} đã được xử lý trước đó, bỏ qua update", checkout.getCheckoutID());
            return;
        }
        
        checkout.updatePaymentStatus(status);
        checkout.setTransactionNo(transactionNo);
        
        Booking booking = checkout.getBooking();
        booking.updatePaymentStatus(status.name());
        
        if (status == PaymentStatus.SUCCESS) {
            booking.updateBookingStatus("CONFIRMED");
        } else if (status == PaymentStatus.FAILED) {
            booking.updateBookingStatus("CANCELLED");
        }
        
        checkoutRepository.save(checkout);
        bookingRepository.save(booking);
        
        log.info("Đã update payment status cho transaction: {} thành {}", transactionId, status);
    }
    
    public Checkout findCheckoutById(Integer checkoutId) {
        return checkoutRepository.findById(checkoutId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy checkout với ID: " + checkoutId));
    }
}
