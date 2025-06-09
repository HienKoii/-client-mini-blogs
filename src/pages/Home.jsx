import { VStack } from "@chakra-ui/react";
import CreatePost from "../components/posts/CreatePost";
import PostList from "../components/posts/PostList";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import PostsContext from "../contexts/PostsContext";
const Home = () => {
  const { user } = useContext(UserContext);
  const { posts } = useContext(PostsContext);

  return (
    <>
      <VStack spacing={6} align="stretch">
        {user && <CreatePost />}
        <PostList posts={posts} />
      </VStack>
    </>
  );
};

export default Home;
