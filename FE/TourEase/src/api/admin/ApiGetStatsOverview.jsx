import httpRequest from "../../utils/httpRequest";

export const ApiGetStatsOverview = () =>
  httpRequest.get("/api/admin/dashboard/stats-overview");
