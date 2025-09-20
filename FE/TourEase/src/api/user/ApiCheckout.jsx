import httpRequest from "../../utils/httpRequest";

export const ApiCheckout = (formData) =>
  httpRequest.post("/api/checkout", formData);
