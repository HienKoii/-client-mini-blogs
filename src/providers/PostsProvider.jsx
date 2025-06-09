import React, { useEffect, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import PostsContext from "../contexts/PostsContext";
import PostsServices from "../services/PostsServices";

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPostsPublic = async () => {
    try {
      setIsLoading(true);
      const response = await PostsServices.getPublic();
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

  useEffect(() => {
    fetchPostsPublic();
  }, []);

  const values = {
    posts,
    isLoading,
    refreshPosts,
  };

  if (isLoading) {
    return (
      <Center h="200px">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return <PostsContext.Provider value={values}>{children}</PostsContext.Provider>;
};
