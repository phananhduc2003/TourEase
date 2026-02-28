import httpRequest from "../../utils/httpRequest";

export const ApiGetManageTours = async () =>
  httpRequest.get("/api/auth/manage-tours");
