import httpRequest from "../../utils/httpRequest";

export const ApiGetDepartureLocations = () =>
  httpRequest.get("/api/public/tours/departureLocations");
