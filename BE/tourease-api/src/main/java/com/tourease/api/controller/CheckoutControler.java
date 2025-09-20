package com.tourease.api.controller;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tourease.api.DTO.CheckoutRequest;
import com.tourease.api.Enum.PaymentStatus;
import com.tourease.api.entity.Booking;
import com.tourease.api.entity.Checkout;
import com.tourease.api.service.CheckoutService;
import com.tourease.api.service.VNPayService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/checkout")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class CheckoutControler {
	private final CheckoutService checkoutService;
    private final VNPayService vnPayService;
    
    @PostMapping
    public ResponseEntity<?> createCheckout(@Valid @RequestBody CheckoutRequest request) {
        log.info("Nhận request checkout cho tour: {}, user: {}, amount adults: {}, children: {}", 
                request.getTourId(), request.getUserId(), request.getNumAdults(), request.getNumChildren());

        Integer userId = request.getUserId();

        // Bước 1: Tạo booking
        Booking booking = checkoutService.createBookingFromCheckout(request, userId);

        // Bước 2: Tạo checkout
        Checkout checkout = checkoutService.createCheckout(booking, request);

        // Bước 3: Xử lý thanh toán theo phương thức
        String paymentResult = checkoutService.processPayment(checkout);

        // Tạo response
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Checkout thành công");
        response.put("bookingId", booking.getBookingID());
        response.put("checkoutId", checkout.getCheckoutID());
        response.put("transactionId", checkout.getTransactionID());
        response.put("amount", checkout.getAmount());
        response.put("paymentMethod", checkout.getPaymentMethod().getDisplayName());

        // Xử lý response theo từng phương thức thanh toán
        switch (checkout.getPaymentMethod()) {
            case OFFICE_PAYMENT:
                response.put("paymentStatus", "PENDING");
                response.put("message", paymentResult);
                break;
            case VNPAY:
                response.put("paymentStatus", "REDIRECT");
                response.put("redirectUrl", paymentResult);
                response.put("message", "Chuyển hướng đến VNPay để thanh toán");
                break;
        }

        log.info("Checkout thành công - BookingID: {}, CheckoutID: {}, Amount: {}", 
                booking.getBookingID(), checkout.getCheckoutID(), checkout.getAmount());

        return ResponseEntity.ok(response);
    }

    /**
     * API lấy thông tin checkout theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getCheckout(@PathVariable Integer id) {
        log.info("Lấy thông tin checkout ID: {}", id);

        Checkout checkout = checkoutService.findCheckoutById(id);

        Map<String, Object> response = new HashMap<>();
        response.put("checkoutId", checkout.getCheckoutID());
        response.put("transactionId", checkout.getTransactionID());
        response.put("amount", checkout.getAmount());
        response.put("paymentMethod", checkout.getPaymentMethod().getDisplayName());
        response.put("paymentStatus", checkout.getPaymentStatus().getDisplayName());
        response.put("createdAt", checkout.getCreatedAt());
        response.put("bookingId", checkout.getBooking().getBookingID());

        return ResponseEntity.ok(response);
    }

    /**
     * API callback từ VNPay (Return URL) - Fixed theo pattern cũ
     */
    @GetMapping("/vnpay-return")
    public void vnpayReturn(@RequestParam Map<String, String> allParams, 
                           HttpServletResponse response) throws Exception {
        log.info("Nhận VNPay return callback cho transaction: {}", allParams.get("vnp_TxnRef"));

        try {
            // 1. Copy params để verify (vì verifyPaymentResponse sẽ remove vnp_SecureHash)
            Map<String, String> vnpParams = new HashMap<>(allParams);
            
            // 2. Verify signature
            boolean isValidSignature = vnPayService.verifyPaymentResponse(vnpParams);
            String transactionId = allParams.get("vnp_TxnRef");
            String responseCode = allParams.get("vnp_ResponseCode");
            
            String redirectMessage;
            
            if (!isValidSignature) {
                redirectMessage = "Chữ ký không hợp lệ";
            } else if ("00".equals(responseCode)) {
                // 3. Update payment status khi thành công
                checkoutService.updatePaymentStatusByTransactionId(
                    transactionId, 
                    PaymentStatus.SUCCESS, 
                    allParams.get("vnp_TransactionNo")
                );
                redirectMessage = "Thanh toán thành công";
            } else {
                // 4. Update payment status khi thất bại
                checkoutService.updatePaymentStatusByTransactionId(
                    transactionId, 
                    PaymentStatus.FAILED, 
                    allParams.get("vnp_TransactionNo")
                );
                redirectMessage = "Thanh toán thất bại";
            }
            
            // 5. Redirect về frontend theo pattern cũ
            String baseRedirect = "http://localhost:5173"; 
            String encodedMessage = URLEncoder.encode(redirectMessage, StandardCharsets.UTF_8);
            String finalRedirectUrl = baseRedirect + "?message=" + encodedMessage + 
                                    "&transactionId=" + transactionId +
                                    "&success=" + ("00".equals(responseCode));
            
            log.info("Redirecting to: {}", finalRedirectUrl);
            response.sendRedirect(finalRedirectUrl);

        } catch (Exception e) {
            log.error("Lỗi xử lý VNPay return: ", e);
            
            // Redirect về error page
            String errorRedirect = "http://localhost:5173/payment-result?message=" + 
                                 URLEncoder.encode("Lỗi xử lý kết quả thanh toán", StandardCharsets.UTF_8) +
                                 "&success=false";
            response.sendRedirect(errorRedirect);
        }
    }

    /**
     * API webhook từ VNPay (IPN)
     */
    @PostMapping("/vnpay-ipn")
    public ResponseEntity<?> vnpayIPN(@RequestParam Map<String, String> vnpParams) {
        log.info("Nhận VNPay IPN cho transaction: {}", vnpParams.get("vnp_TxnRef"));

        try {
            // 1. Verify signature
            boolean isValidSignature = vnPayService.verifyPaymentResponse(vnpParams);
            if (!isValidSignature) {
                return ResponseEntity.ok(Map.of("RspCode", "97", "Message", "Invalid signature"));
            }

            // 2. Check payment success
            boolean isPaymentSuccess = vnPayService.isPaymentSuccess(vnpParams);
            String transactionId = vnpParams.get("vnp_TxnRef");
            Map<String, String> paymentDetails = vnPayService.parseVNPayResponse(vnpParams);

            // 3. Update payment status
            checkoutService.updatePaymentStatusByTransactionId(
                transactionId, 
                isPaymentSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED, 
                paymentDetails.get("transactionNo")
            );

            log.info("VNPay IPN processed - Transaction: {}, Success: {}", transactionId, isPaymentSuccess);

            // VNPay yêu cầu response theo format này
            return ResponseEntity.ok(Map.of("RspCode", "00", "Message", "Confirm Success"));

        } catch (Exception e) {
            log.error("Lỗi xử lý VNPay IPN: ", e);
            return ResponseEntity.ok(Map.of("RspCode", "99", "Message", "System Error"));
        }
    }

    /**
     * API test connectivity
     */
    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "OK");
        response.put("service", "CheckoutController");
        response.put("timestamp", System.currentTimeMillis());

        return ResponseEntity.ok(response);
    }

    /**
     * API lấy danh sách phương thức thanh toán
     */
    @GetMapping("/payment-methods")
    public ResponseEntity<?> getPaymentMethods() {
        Map<String, Object> response = new HashMap<>();
        response.put("methods", new Object[]{
            Map.of("code", "OFFICE_PAYMENT", "name", "Thanh toán tại văn phòng", "enabled", true),
            Map.of("code", "VNPAY", "name", "Thanh toán bằng VnPay", "enabled", true)
        });

        return ResponseEntity.ok(response);
    }
}
