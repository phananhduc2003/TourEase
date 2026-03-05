import httpRequest from "../../utils/httpRequest";

export const ApiCreateTour = async (tourData) =>
  httpRequest.post("/api/admin/tours", tourData);
