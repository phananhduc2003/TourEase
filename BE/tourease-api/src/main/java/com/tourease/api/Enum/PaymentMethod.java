package com.tourease.api.Enum;

public enum PaymentMethod {
	OFFICE_PAYMENT("Thanh toán tại văn phòng"),
    VNPAY("Thanh toán bằng VnPay");

    private final String displayName;

    PaymentMethod(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}