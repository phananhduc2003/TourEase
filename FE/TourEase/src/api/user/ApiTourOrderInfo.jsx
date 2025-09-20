import httpRequest from "../../utils/httpRequest";

export const ApiTourOrderInfo = (tourId) =>
  httpRequest.get(`/api/public/tours/${tourId}/tour-odered`);
