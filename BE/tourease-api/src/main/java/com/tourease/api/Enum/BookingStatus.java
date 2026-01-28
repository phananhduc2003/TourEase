package com.tourease.api.Enum;

public enum  BookingStatus {
	PENDING("Đang chờ"),
    CONFIRMED("Đã xác nhận"),  
    COMPLETED("Hoàn thành"),
    CANCELLED("Đã hủy");

    private final String displayName;

    BookingStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
