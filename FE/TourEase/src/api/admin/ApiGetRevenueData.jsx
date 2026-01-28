import httpRequest from "../../utils/httpRequest";

export const ApiGetRevenueData = async (timeRange) =>
  httpRequest.get("/api/auth/dashboard/revenue", {
    params: { timeRange },
  });
