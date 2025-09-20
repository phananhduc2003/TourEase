package com.tourease.api.Enum;

public enum PaymentStatus {
	PENDING("Đang chờ"),
    SUCCESS("Thành công"),
    FAILED("Thất bại");

    private final String displayName;

    PaymentStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}