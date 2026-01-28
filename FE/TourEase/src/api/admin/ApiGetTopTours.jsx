import httpRequest from "../../utils/httpRequest";

export const ApiGetTopTours = async (limit) =>
  httpRequest.get("/api/auth/dashboard/top-tours", {
    params: { limit },
  });
