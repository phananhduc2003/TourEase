package com.tourease.api.service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Collections;
import java.util.Date;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.tourease.api.entity.Checkout;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class VNPayService {

	@Value("${vnpay.tmn-code}")
    private String vnp_TmnCode;
    
    @Value("${vnpay.hash-secret}")
    private String vnp_HashSecret;
    
    @Value("${vnpay.pay-url}")
    private String vnp_PayUrl;
    
    @Value("${vnpay.return-url}")
    private String vnp_ReturnUrl;
    
    @Value("${vnpay.notify-url}")
    private String vnp_NotifyUrl;

    /**
     * Tạo URL thanh toán VNPay - Sử dụng logic từ code cũ đã working
     */
    public String createPaymentUrl(Checkout checkout) throws UnsupportedEncodingException {
        log.info("Tạo VNPay payment URL cho checkout: {}, amount: {}", 
                checkout.getCheckoutID(), checkout.getAmount());
        
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_OrderType = "other";
        String vnp_TxnRef = checkout.getTransactionID();
        String vnp_IpAddr = "127.0.0.1"; // Default IP vì không có HttpServletRequest
        
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(Math.round(checkout.getAmount() * 100))); // Convert to VND cents
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan tour booking " + checkout.getBooking().getBookingID());
        vnp_Params.put("vnp_OrderType", vnp_OrderType);
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
        vnp_Params.put("vnp_CreateDate", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
        
        // Log parameters để debug
        log.info("VNPay Parameters:");
        vnp_Params.forEach((key, value) -> log.info("{}: {}", key, value));
        
        // Sắp xếp và tạo hash theo logic code cũ
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        
        for (String fieldName : fieldNames) {
            String value = vnp_Params.get(fieldName);
            if ((value != null) && (value.length() > 0)) {
                // Sử dụng US_ASCII encoding như code cũ
                hashData.append(fieldName).append('=')
                        .append(URLEncoder.encode(value, StandardCharsets.US_ASCII)).append('&');
                query.append(fieldName).append('=')
                     .append(URLEncoder.encode(value, StandardCharsets.US_ASCII)).append('&');
            }
        }
        
        // Remove last "&"
        hashData.setLength(hashData.length() - 1);
        query.setLength(query.length() - 1);
        
        // Tạo secure hash
        String secureHash = hmacSHA512(vnp_HashSecret, hashData.toString());
        query.append("&vnp_SecureHash=").append(secureHash);
        
        String paymentUrl = vnp_PayUrl + "?" + query.toString();
        
        log.info("Generated VNPay URL: {}", paymentUrl);
        
        return paymentUrl;
    }

    /**
     * Xác thực callback từ VNPay - Sử dụng logic từ code cũ
     */
    public boolean verifyPaymentResponse(Map<String, String> vnpParams) {
        log.info("Verify VNPay response: {}", vnpParams.get("vnp_TxnRef"));
        
        try {
            String vnpSecureHash = vnpParams.remove("vnp_SecureHash");
            
            // Tạo lại hash để verify
            List<String> keys = new ArrayList<>(vnpParams.keySet());
            Collections.sort(keys);
            
            StringBuilder signData = new StringBuilder();
            for (String key : keys) {
                String value = vnpParams.get(key);
                if (value != null && !value.isEmpty()) {
                    String encodedValue = URLEncoder.encode(value, StandardCharsets.US_ASCII.toString());
                    signData.append(key).append("=").append(encodedValue).append("&");
                }
            }
            signData.setLength(signData.length() - 1);
            
            String myHash = hmacSHA512Internal(signData.toString());
            
            boolean isValid = myHash.equals(vnpSecureHash);
            log.info("VNPay signature verification: {}", isValid ? "SUCCESS" : "FAILED");
            
            return isValid;
            
        } catch (Exception e) {
            log.error("Lỗi verify VNPay response: ", e);
            return false;
        }
    }

    /**
     * Kiểm tra trạng thái thanh toán thành công
     */
    public boolean isPaymentSuccess(Map<String, String> vnpParams) {
        String responseCode = vnpParams.get("vnp_ResponseCode");
        boolean success = "00".equals(responseCode);
        
        log.info("Payment status check - ResponseCode: {}, Success: {}", responseCode, success);
        
        return success;
    }

    /**
     * HMAC SHA512 method từ code cũ - đã working
     */
    private String hmacSHA512(String key, String data) {
        try {
            Mac hmac512 = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(), "HmacSHA512");
            hmac512.init(secretKey);
            byte[] bytes = hmac512.doFinal(data.getBytes());
            StringBuilder hash = new StringBuilder();
            for (byte b : bytes) {
                hash.append(String.format("%02x", b));
            }
            return hash.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error while generating HMAC", e);
        }
    }
    
    /**
     * HMAC SHA512 internal method từ code cũ - để verify response
     */
    public String hmacSHA512Internal(String data) {
        try {
            Mac hmac512 = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKey = new SecretKeySpec(vnp_HashSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA512");
            hmac512.init(secretKey);
            byte[] bytes = hmac512.doFinal(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder hash = new StringBuilder();
            for (byte b : bytes) {
                hash.append(String.format("%02x", b));
            }
            return hash.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error while generating HMAC", e);
        }
    }
    
    /**
     * Parse response từ VNPay để lấy thông tin
     */
    public Map<String, String> parseVNPayResponse(Map<String, String> vnpParams) {
        Map<String, String> result = new HashMap<>();
        
        result.put("transactionId", vnpParams.get("vnp_TxnRef"));
        result.put("transactionNo", vnpParams.get("vnp_TransactionNo"));
        result.put("amount", vnpParams.get("vnp_Amount"));
        result.put("responseCode", vnpParams.get("vnp_ResponseCode"));
        result.put("bankCode", vnpParams.get("vnp_BankCode"));
        result.put("payDate", vnpParams.get("vnp_PayDate"));
        
        return result;
    }
}