import httpRequest from "../../utils/httpRequest";

export const ApiGetInforProfileUser = (userId, formData) =>
  httpRequest.put(`api/public/user/update-profile-user/${userId}`, formData);
