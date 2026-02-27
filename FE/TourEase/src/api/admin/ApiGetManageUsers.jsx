import httpRequest from "../../utils/httpRequest";

export const ApiGetManageUsers = async () =>
  httpRequest.get("/api/auth/user/manage-users");
