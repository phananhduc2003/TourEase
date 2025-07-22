import httpRequest from "../../utils/httpRequest";

export const ApiRegister = async (formData) => {
  return httpRequest.post("/api/auth/register", formData);
};
