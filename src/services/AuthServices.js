import axiosInstance from "../api/axiosInstance";

const AuthServices = {
  login: (credentials) => {
    return axiosInstance.post("/auth/login", credentials, { authRequired: false });
  },

  logout: () => {
    return axiosInstance.post("/auth/logout", { authRequired: false });
  },

  register: (data) => {
    return axiosInstance.post("/auth/register", data, { authRequired: false });
  },

  getMe: () => {
    return axiosInstance.get("/auth/me");
  },

  changePassword: (data) => {
    return axiosInstance.post("/auth/change-password", data);
  },
};

export default AuthServices;
