import axiosInstance from "../api/axiosInstance";

const PostsServices = {
  create: (data) => {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("privacy", data.privacy);

    // Append each file from media array
    if (data.media && data.media.length > 0) {
      data.media.forEach((item) => {
        formData.append("files", item.file);
      });
    }

    return axiosInstance.post("/posts/create", formData);
  },

  getPublic: () => {
    return axiosInstance.get("/posts/public", { authRequired: false });
  },

  update: (data) => {
    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("status", data.status);
    formData.append("keepMedias", JSON.stringify(data.keepMedias));
    // Append each file from media array
    if (data.media && data.media.length > 0) {
      data.media.forEach((item) => {
        formData.append("files", item.file);
      });
    }
    return axiosInstance.put(`/posts/update/${data.postId}`, formData);
  },
};

export default PostsServices;
