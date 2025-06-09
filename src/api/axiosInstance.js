// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});

// Interceptor để tự động thêm Authorization token nếu cần
axiosInstance.interceptors.request.use(
  (config) => {
    // Mặc định là true nếu không khai báo
    const requiresAuth = config.authRequired !== false;

    if (requiresAuth) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Nếu không phải FormData thì mới set Content-Type là application/json
    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
