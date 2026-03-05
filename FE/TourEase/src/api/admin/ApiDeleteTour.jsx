import httpRequest from "../../utils/httpRequest";

export const ApiDeleteTour = async (tourId) =>
  httpRequest.delete(`/api/admin/tours/${tourId}`);
