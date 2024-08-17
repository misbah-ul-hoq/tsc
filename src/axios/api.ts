import axios from "axios";

const api = axios.create({
  baseURL: "https://api-tsc.vercel.app",
  // baseURL: "http://localhost:8080",
});

export default api;
