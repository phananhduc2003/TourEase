import httpRequest from "../../utils/httpRequest";

export const ApiGetChatHistory = (userID) =>
  httpRequest.get(`/api/auth/chat-history/${userID}`);
