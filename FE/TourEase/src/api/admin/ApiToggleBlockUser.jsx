import httpRequest from "../../utils/httpRequest";

export const ApiToggleBlockUser = async (userId, status) =>
  httpRequest.patch(`/api/admin/users/${userId}/status`, {
    status: status,
  });
