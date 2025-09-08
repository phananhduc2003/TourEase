import httpRequest from "../../utils/httpRequest";

export const ApiDetailTour = (tourID) =>
  httpRequest.get(`/api/public/tours/${tourID}`);
