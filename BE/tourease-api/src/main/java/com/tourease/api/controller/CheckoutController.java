package com.tourease.api.controller;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
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
import com.tourease.api.DTO.CheckoutResultDTO;
import com.tourease.api.Enum.PaymentStatus;
import com.tourease.api.entity.Booking;
import com.tourease.api.entity.Checkout;
import com.tourease.api.exception.ResourceNotFoundException;
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
public class CheckoutController {
	private final CheckoutService checkoutService;
    private final VNPayService vnPayService;
    
    @PostMapping
    public ResponseEntity<?> createCheckout(@Valid @RequestBody CheckoutRequest request) {
        log.info("Nhận request checkout cho tour: {}, user: {}", 
                request.getTourId(), request.getUserId());

        try {
            
            CheckoutResultDTO result = checkoutService.processCompleteCheckout(
                request, 
                request.getUserId()
            );

         
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("bookingId", result.getBooking().getBookingID());
            response.put("checkoutId", result.getCheckout().getCheckoutID());
            response.put("transactionId", result.getCheckout().getTransactionID());
            response.put("amount", result.getCheckout().getAmount());
            response.put("paymentMethod", result.getCheckout().getPaymentMethod().getDisplayName());

          
            switch (result.getCheckout().getPaymentMethod()) {
                case OFFICE_PAYMENT:
                    response.put("paymentStatus", "PENDING");
                    response.put("message", result.getPaymentResult());
                    break;
                case VNPAY:
                    response.put("paymentStatus", "REDIRECT");
                    response.put("redirectUrl", result.getPaymentResult());
                    response.put("message", "Chuyển hướng đến VNPay để thanh toán");
                    break;
            }

            log.info("Checkout thành công - BookingID: {}, Amount: {}", 
                    result.getBooking().getBookingID(), result.getCheckout().getAmount());

            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            // Validation error
            log.error("Validation error: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "VALIDATION_ERROR",
                "message", e.getMessage()
            ));
            
        } catch (ResourceNotFoundException e) {
            // Resource not found
            log.error("Resource not found: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                "success", false,
                "error", "NOT_FOUND",
                "message", e.getMessage()
            ));
            
        } catch (Exception e) {
            // Unknown error
            log.error("Lỗi không xác định khi checkout: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "error", "INTERNAL_ERROR",
                "message", "Đã xảy ra lỗi khi xử lý đơn hàng. Vui lòng thử lại sau."
            ));
        }
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
            
            String userId = transactionId.split("-")[0];

            
            String redirectMessage;
            
            if (!isValidSignature) {
                redirectMessage = "Chữ ký không hợp lệ";
            } else if ("00".equals(responseCode)) {
              
                checkoutService.updatePaymentStatusByTransactionId(
                    transactionId, 
                    PaymentStatus.SUCCESS, 
                    allParams.get("vnp_TransactionNo")
                );
                redirectMessage = "Thanh toán thành công";
            } else {
               
                checkoutService.updatePaymentStatusByTransactionId(
                    transactionId, 
                    PaymentStatus.FAILED, 
                    allParams.get("vnp_TransactionNo")
                );
                redirectMessage = "Thanh toán thất bại";
            }
            
          
            String baseRedirect = "http://localhost:5173/infor-booking/" + userId;
            String encodedMessage = URLEncoder.encode(redirectMessage, StandardCharsets.UTF_8);
            String finalRedirectUrl = baseRedirect + "?message=" + encodedMessage + 
                                    "&transactionId=" + transactionId +
                                    "&success=" + ("00".equals(responseCode));
            
            log.info("Redirecting to: {}", finalRedirectUrl);
            response.sendRedirect(finalRedirectUrl);

        } catch (Exception e) {
            log.error("Lỗi xử lý VNPay return: ", e);
            
           
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
          
            boolean isValidSignature = vnPayService.verifyPaymentResponse(vnpParams);
            if (!isValidSignature) {
                return ResponseEntity.ok(Map.of("RspCode", "97", "Message", "Invalid signature"));
            }

           
            boolean isPaymentSuccess = vnPayService.isPaymentSuccess(vnpParams);
            String transactionId = vnpParams.get("vnp_TxnRef");
            Map<String, String> paymentDetails = vnPayService.parseVNPayResponse(vnpParams);

         
            checkoutService.updatePaymentStatusByTransactionId(
                transactionId, 
                isPaymentSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED, 
                paymentDetails.get("transactionNo")
            );

            log.info("VNPay IPN processed - Transaction: {}, Success: {}", transactionId, isPaymentSuccess);

          
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
