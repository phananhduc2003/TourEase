import httpRequest from "../../utils/httpRequest";

export const ApiGetInforBooking = (userId) =>
  httpRequest.get(`/api/auth/booking/${userId}`);
