import React, { useEffect, useState } from "react";

import PostsContext from "../contexts/PostsContext";
import PostsServices from "../services/PostsServices";

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPostsPublic = async () => {
    try {
      setIsLoading(true);
      const response = await PostsServices.getPublic();
      console.log('response', response)
      setPosts(response?.data);
    } catch (error) {
      console.error("Lỗi khi lấy bài viết:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPosts = () => {
    fetchPostsPublic();
  };

  const handleCreatePost = async (data) => {
    try {
      const res = await PostsServices.create(data);
      if (res.status === 201 || res.status === 200) {
        fetchPostsPublic();
      }
      return res;
    } catch (error) {
      console.log("error handleCreatePost: ", error);
      throw error;
    }
  };

  const handleUpdatePost = async (data) => {
    try {
      console.log("data", data);

      const res = await PostsServices.update(data);
      console.log("res handleUpdatePost: ", res);
      return res;
    } catch (error) {
      console.log("error handleUpdatePost: ", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPostsPublic();
  }, []);

  const values = {
    posts,
    isLoading,
    refreshPosts,
    handleCreatePost,
    handleUpdatePost,
  };

  return <PostsContext.Provider value={values}>{children}</PostsContext.Provider>;
};
