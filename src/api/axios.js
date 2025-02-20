import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => {
    debugger;
    const token = response.headers["authorization"]?.split(" ")[1];
    if (token) {
      localStorage.setItem("token", token);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default API;
