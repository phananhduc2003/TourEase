import httpRequest from "../../utils/httpRequest";

export const ApiUpdateTour = async (tourId, tourData) =>
  httpRequest.put(`/api/admin/tours/${tourId}`, tourData);
