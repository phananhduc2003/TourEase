import httpRequest from "../../utils/httpRequest";

export const ApiGetRevenueData = async (timeRange) =>
  httpRequest.get("/api/admin/dashboard/revenue", {
    params: { timeRange },
  });
