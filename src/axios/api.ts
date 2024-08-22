import axios from "axios";

const api = axios.create({
  // baseURL: "https://api-tsc.vercel.app",
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
  config.headers["accessToken"] = localStorage.getItem("accessToken");
  return config;
});

export default api;
