import httpRequest from "../../utils/httpRequest";

export const ApiSaveChatMessage = (data) =>
  httpRequest.post(`/api/auth/chat-history`, data);
