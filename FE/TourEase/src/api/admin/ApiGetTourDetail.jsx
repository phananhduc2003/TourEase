import httpRequest from "../../utils/httpRequest";

export const ApiGetTourDetail = async (tourId) =>
  httpRequest.get(`/api/admin/tours/${tourId}`);
