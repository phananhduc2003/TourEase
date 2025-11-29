import httpRequest from "../../utils/httpRequest";

export const ApiGetInforProfileUser = (userId) =>
  httpRequest.get(`api/auth/user/profile-user/${userId}`);
