import httpRequest from "../../utils/httpRequest";

export const ApiLogin = async (username, password) => {
  return await httpRequest.post("/api/auth/login", {
    userName: username,
    password,
  });
};
