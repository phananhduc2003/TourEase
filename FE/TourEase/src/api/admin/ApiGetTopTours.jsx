import httpRequest from "../../utils/httpRequest";

export const ApiGetTopTours = async (limit) =>
  httpRequest.get("/api/admin/dashboard/top-tours", {
    params: { limit },
  });
