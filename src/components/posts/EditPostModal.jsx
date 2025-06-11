import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useColorModeValue } from "@chakra-ui/react";
import PostForm from "./PostForm";
import { useContext } from "react";
import PostsContext from "../../contexts/PostsContext";

const EditPostModal = ({ isOpen, onClose, post }) => {
  const { handleUpdatePost } = useContext(PostsContext);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
          Chỉnh sửa bài viết
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={4}>
          <PostForm
            initialContent={post?.content} //
            initialStatus={post?.status}
            initialMedia={post?.media}
            keepMedias={post?.media}
            postId={post?.id}
            onSubmit={handleUpdatePost}
            submitText="Lưu thay đổi"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditPostModal;
