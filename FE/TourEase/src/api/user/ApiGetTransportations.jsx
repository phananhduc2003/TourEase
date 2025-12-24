import httpRequest from "../../utils/httpRequest";

export const ApiGetTransportations = () =>
  httpRequest.get("/api/public/tours/transportations");
