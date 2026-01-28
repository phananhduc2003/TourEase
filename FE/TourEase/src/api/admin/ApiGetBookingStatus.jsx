import httpRequest from "../../utils/httpRequest";

export const ApiGetBookingStatus = async () =>
  httpRequest.get("/api/auth/dashboard/status");
