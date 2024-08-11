import axios from "axios";

export const api = axios.create({
    baseURL:
      process.env.NODE_ENV === "production" ? "/api" : "//localhost:3000/api",
  });
  
  api.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem("token");
      if (token) {
      
  
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );