package com.tourease.api.DTO;

import com.tourease.api.Enum.PaymentMethod;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

 
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckoutRequest {

	@NotNull(message = "Tour ID không được để trống")
    private Integer tourId;
    
    @NotNull(message = "User ID không được để trống")
    private Integer userId;
    
    // Thông tin liên lạc
    @NotBlank(message = "Họ và tên không được để trống")
    private String contactName;
    
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String contactEmail;
    
    @NotBlank(message = "Số điện thoại không được để trống")
    private String contactPhone;
    
    private String contactAddress;
    
    // Thông tin hành khách
    @NotNull(message = "Số người lớn không được để trống")
    @Min(value = 1, message = "Phải có ít nhất 1 người lớn")
    private Integer numAdults;
    
    @Min(value = 0, message = "Số trẻ em không được âm")
    private Integer numChildren = 0;
    
    // Phương thức thanh toán
    @NotNull(message = "Phương thức thanh toán không được để trống")
    private PaymentMethod paymentMethod;
    
    // Yêu cầu đặc biệt
    private String specialRequests;
    
    // Checkbox đồng ý điều khoản
    @AssertTrue(message = "Bạn phải đồng ý với điều khoản thanh toán")
    private Boolean agreeToTerms;
}
