import httpRequest from "../../utils/httpRequest";

export const ApiGetManageTours = async () =>
  httpRequest.get("/api/admin/tours");
