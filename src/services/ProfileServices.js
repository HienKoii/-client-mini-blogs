import axiosInstance from "../api/axiosInstance";

const ProfileServices = {
  // Lấy thông tin profile của người dùng khác
  getProfileById: (userId) => {
    return axiosInstance.get(`/auth/profile/${userId}`);
  },

  // Lấy thông tin profile của chính mình
  getMyProfile: () => {
    return axiosInstance.get("/auth/profile/me");
  },

  // Cập nhật thông tin profile
  updateProfile: (data) => {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.bio) formData.append("bio", data.bio);
    if (data.avatar) formData.append("avatar", data.avatar);
    if (data.coverImage) formData.append("cover_image", data.coverImage);
    if (data.setAvatar) formData.append("setAvatar", JSON.stringify(data.setAvatar));

    return axiosInstance.put("auth/profile/update", formData);
  },

  updateProfileImage: (data) => {
    console.log("data", data);
    return axiosInstance.put(`auth/profile/update-${data.type}`, data);
  },

  deleteProfileImage: (data) => {
    console.log("data", data);
    return axiosInstance.post(`auth/profile/delete-${data.type}`, data);
  },
};

export default ProfileServices;
