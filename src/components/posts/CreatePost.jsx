import { Input, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, useToast, HStack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import PostsContext from "../../contexts/PostsContext";
import PostForm from "./PostForm";
import AvatarImg from "../Images/AvatarImg";
import UserContext from "../../contexts/UserContext";
import PATH from "../../utils/path";

const CreatePost = (props) => {
  const { user } = useContext(UserContext);
  const toast = useToast();
  const { handleCreatePost } = useContext(PostsContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");

  const handleSubmit = async (data) => {
    try {
      setIsLoading(true);
      await handleCreatePost(data);
      onClose();
      toast({
        title: "Thành công",
        description: "Đăng bài viết thành công !!!",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Thất bại",
        description: error?.response?.data?.message || "Lỗi server. Vui lòng thử lại sau",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      console.log("error đăng bài viết???> ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HStack
        {...props}
        bg={bgColor}
        p={4}
        borderRadius="lg" //
        boxShadow="sm"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <AvatarImg src={user?.avatar?.[0]?.url} to={PATH.profileId(user?.id)} size={"md"} />
        <Input
          placeholder="Bạn đang nghĩ gì?"
          borderRadius="full"
          bg={useColorModeValue("gray.50", "gray.700")}
          borderColor={borderColor}
          _hover={{ borderColor: "blue.500" }}
          _focus={{ borderColor: "blue.500" }}
          onClick={onOpen}
        />
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={bgColor}>
          <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
            Tạo bài viết
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={4}>
            <PostForm onSubmit={handleSubmit} isSubmitting={isLoading} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
