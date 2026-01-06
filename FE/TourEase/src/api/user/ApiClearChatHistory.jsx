import httpRequest from "../../utils/httpRequest";

export const ApiClearChatHistory = (userID) =>
  httpRequest.delete(`/api/auth/chat-history/${userID}`);
