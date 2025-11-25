import httpRequest from "../../utils/httpRequest";

export const ApiGetInforProfileUser = (userId) =>
  httpRequest.get(`api/public/user/profile-user/${userId}`);
