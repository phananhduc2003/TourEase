import httpRequest from "../../utils/httpRequest";

export const ApiGetManageUsers = async () =>
  httpRequest.get("/api/admin/users");
