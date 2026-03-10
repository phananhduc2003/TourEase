import httpRequest from "../../utils/httpRequest";

export const ApiBookingStatus = async (
  bookingId,
  bookingStatus,
  paymentStatus,
) =>
  httpRequest.put(`/api/admin/bookings/${bookingId}/status`, {
    bookingStatus: bookingStatus,
    paymentStatus: paymentStatus,
  });
