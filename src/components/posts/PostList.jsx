import { VStack } from "@chakra-ui/react";
import PostItem from "./PostItem";

const PostList = ({ posts }) => {
  return (
    <VStack spacing={6} align="stretch">
      {posts?.length === 0 ? <p>Chưa có bài viết công khai nào.</p> : posts?.map((post) => <PostItem key={post.id} post={post} />)}
    </VStack>
  );
};

export default PostList;
