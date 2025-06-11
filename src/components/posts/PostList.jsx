import { VStack, Center, Text, Icon, Spinner } from "@chakra-ui/react";
import { FaNewspaper } from "react-icons/fa";
import PostItem from "./PostItem";

const PostList = ({ posts, loading }) => {
  if (loading) {
    return (
      <Center py={8} w="full">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      {posts?.length === 0 ? (
        <Center py={8} w="full">
          <VStack spacing={4}>
            <Icon as={FaNewspaper} w={12} h={12} color="gray.400" />
            <Text color="gray.500">Chưa có bài viết nào</Text>
          </VStack>
        </Center>
      ) : (
        posts?.map((post) => <PostItem key={post.id} post={post} />)
      )}
    </VStack>
  );
};

export default PostList;
