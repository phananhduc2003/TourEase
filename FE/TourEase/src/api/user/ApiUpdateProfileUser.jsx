import httpRequest from "../../utils/httpRequest";

export const ApiUpdateProfileUser = (userId, formData) =>
  httpRequest.put(`api/auth/user/update-profile-user/${userId}`, formData);
