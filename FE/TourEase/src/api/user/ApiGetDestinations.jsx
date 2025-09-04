import httpRequest from "../../utils/httpRequest";

export const ApiGetDestinations = () =>
  httpRequest.get("/api/public/tours/destinations");
