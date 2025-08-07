import httpRequest from "../../utils/httpRequest";

export const ApiPopularTour = () =>
  httpRequest.get("/api/public/tours/popular");
