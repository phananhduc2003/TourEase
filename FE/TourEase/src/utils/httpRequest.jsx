import axios from "axios";

const httpRequest = axios.create({
  baseURL: "http://localhost:8080",
});

httpRequest.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default httpRequest;
