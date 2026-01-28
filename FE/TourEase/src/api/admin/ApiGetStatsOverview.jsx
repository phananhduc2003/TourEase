import httpRequest from "../../utils/httpRequest";

export const ApiGetStatsOverview = () =>
  httpRequest.get("/api/auth/dashboard/stats-overview");
