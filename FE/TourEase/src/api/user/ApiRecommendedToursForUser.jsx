import httpRequest from "../../utils/httpRequest";

export const getRecommendedToursForUser = async (userId) =>
  httpRequest.get(`/api/auth/recommend/user/${userId}`);
