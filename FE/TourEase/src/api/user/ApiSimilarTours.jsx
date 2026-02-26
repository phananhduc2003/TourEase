import httpRequest from "../../utils/httpRequest";

export const ApiSimilarTour = async (tourId) =>
  httpRequest.get(`/api/public/recommend/similar/${tourId}`);
