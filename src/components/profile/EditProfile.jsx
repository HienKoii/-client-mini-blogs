import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  Image,
  Box,
  Icon,
  useColorModeValue,
  ModalFooter,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import ProfileServices from "../../services/ProfileServices";
import UserContext from "../../contexts/UserContext";

export default function EditProfile({ isOpen, onClose, profileUser, onUpdate }) {
  console.log("profileUser", profileUser);
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: profileUser?.name || "",
    bio: profileUser?.bio || "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(profileUser?.avatar[0]?.url);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(profileUser?.cover_image[0]?.url);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const playLoad = {
        ...formData,
        avatar: avatar ? avatar : profileUser.avatar,
        coverImage: coverImage ? coverImage : profileUser.cover_image,
      };

      const response = await ProfileServices.updateProfile(playLoad);
      onUpdate(response.data.user);
      if (profileUser?.id == user?.id) {
        setUser(response.data.user);
      }
      toast({
        title: "Thành công",
        description: "Thông tin profile đã được cập nhật",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      onClose();
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật thông tin profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chỉnh sửa trang cá nhân</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} maxH={"500px"} overflowY={"scroll"}>
          <form>
            <VStack spacing={6}>
              {/* Cover Image */}
              <Box
                position="relative"
                w="full"
                h="200px" //
                borderRadius="lg"
                overflow="hidden"
                cursor="pointer"
              >
                <label style={{ width: "100%", height: "100%", cursor: "pointer" }}>
                  {coverImagePreview ? (
                    <Image src={coverImagePreview} w="full" h="full" objectFit="cover" />
                  ) : (
                    <Box
                      w="full"
                      h="full"
                      bg="gray.100" //
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={FaImage} w={12} h={12} color="gray.400" />
                    </Box>
                  )}
                  <input type="file" accept="image/*" hidden onChange={handleCoverImageChange} />
                </label>
              </Box>

              {/* Avatar */}
              <Box position="relative" w="full">
                <Box
                  w="120px"
                  h="120px"
                  mx="auto"
                  borderRadius="full" //
                  overflow="hidden"
                  borderWidth="2px"
                  borderColor={borderColor}
                  cursor="pointer"
                >
                  <label style={{ width: "100%", height: "100%", cursor: "pointer" }}>
                    {avatarPreview ? (
                      <Image src={avatarPreview} w="full" h="full" objectFit="cover" />
                    ) : (
                      <Box w="full" h="full" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
                        <Icon as={FaImage} w={8} h={8} color="gray.400" />
                      </Box>
                    )}
                    <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                  </label>
                </Box>
              </Box>

              {/* Name */}
              <FormControl>
                <FormLabel>Tên</FormLabel>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Nhập tên của bạn" />
              </FormControl>

              {/* Bio */}
              <FormControl>
                <FormLabel>Giới thiệu</FormLabel>
                <Textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Viết gì đó về bản thân..." rows={4} />
              </FormControl>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="blue"
            w="full" //
            isLoading={isLoading}
            loadingText="Đang cập nhật..."
            onClick={(e) => handleSubmit(e)}
          >
            Lưu thay đổi
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
