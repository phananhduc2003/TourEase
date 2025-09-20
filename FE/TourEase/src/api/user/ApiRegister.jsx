import httpRequest from "../../utils/httpRequest";

export const ApiRegister = (formData) =>
  httpRequest.post("/api/auth/register", formData);
