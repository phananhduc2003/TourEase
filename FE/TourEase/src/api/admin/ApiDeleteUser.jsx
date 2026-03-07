import httpRequest from "../../utils/httpRequest";

export const ApiDeleteUser = async (userId) =>
  httpRequest.delete(`/api/admin/users/${userId}`);
