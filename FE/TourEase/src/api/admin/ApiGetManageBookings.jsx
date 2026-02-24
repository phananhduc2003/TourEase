import httpRequest from "../../utils/httpRequest";

export const ApiGetManageBookings = async () =>
  httpRequest.get("/api/auth/booking/manage-booking");
