import httpRequest from "../../utils/httpRequest";

export const ApiChatBot = (message) =>
  httpRequest.post("/api/public/chatbot", { message });
