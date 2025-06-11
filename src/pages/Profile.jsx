import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  useColorModeValue,
  Icon,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  useToast,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { FaUserEdit, FaImage, FaNewspaper } from "react-icons/fa";
import { useParams } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import AvatarImg from "../components/Images/AvatarImg";
import PostList from "../components/posts/PostList";
import EditProfile from "../components/profile/EditProfile";
import ProfileServices from "../services/ProfileServices";

import CreatePost from "../components/posts/CreatePost";
import ImagesTabProfile from "../components/profile/ImagesTabProfile";
import CoverImg from "../components/Images/CoverImg";
import UserName from "../components/user/UserName";
import PATH from "../utils/path";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen: isImageModalOpen, onOpen: onImageModalOpen, onClose: onImageModalClose } = useDisclosure();
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");

  // Kiểm tra xem có phải profile của user đang đăng nhập không
  const isMe = user?.id === profileUser?.id;

  const isAvatar = profileUser?.avatar && profileUser?.avatar.length > 0 ? profileUser?.avatar[0]?.url : null;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await ProfileServices.getProfileById(id);
        console.log("fetchProfile:  ", response.data);

        setProfileUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải thông tin profile",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id, toast]);

  const handleUpdateProfile = (updatedUser) => {
    setProfileUser(updatedUser);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onImageModalOpen();
  };

  const handleDeleteProfileImage = async (image, type) => {
    const stringType = type === "avatar" ? "ảnh đại diện" : type === "cover" ? "ảnh bìa" : "????";

    try {
      const convertFieldCover = type === "cover" ? "cover_image" : type;
      const filterFieldList = type === "avatar" ? "listAvatar" : type === "cover" ? "listCoverImage" : "default";
      console.log("filterFieldList", filterFieldList);

      const res = await ProfileServices.deleteProfileImage({ image, type });
      console.log("image.public_id", image.public_id);

      if (res.status == 200) {
        if (isMe) {
          setUser((prev) => ({
            ...prev,
            [convertFieldCover]: res.data.isDelete ? [] : [image],
          }));
        }
        setProfileUser((prev) => ({
          ...prev,
          [convertFieldCover]: res.data.isDelete ? [] : [image],
          [filterFieldList]: (prev[filterFieldList] || []).filter((img) => img.public_id !== image.public_id),
        }));
        toast({
          title: "Thành công",
          description: `Đã đặt làm ${stringType}`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log("error handleSetAsAvatar: ", error);
      toast({
        title: "Lỗi",
        description: `Không thể xóa ${stringType}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSetProfileImage = async (image, type) => {
    try {
      // TODO: Gọi API đặt làm ảnh đại diện
      await ProfileServices.updateProfileImage({ image, type });

      if (isMe) {
        setUser((prev) => ({
          ...prev,
          [type == "cover" ? "cover_image" : type]: [image],
        }));
      }
      setProfileUser((prev) => ({
        ...prev,
        [type == "cover" ? "cover_image" : type]: [image],
      }));
      toast({
        title: "Thành công",
        description: "Đã đặt làm ảnh đại diện",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log("error handleSetAsAvatar: ", error);
      toast({
        title: "Lỗi",
        description: "Không thể đặt làm ảnh đại diện",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Cover Image Skeleton */}
          <Skeleton height="300px" borderRadius="lg" />

          {/* Profile Info Skeleton */}
          <Box position="relative" mt="-100px">
            <Box bg={bgColor} borderRadius="lg" boxShadow="sm" borderWidth="1px" borderColor={borderColor} p={6}>
              <HStack spacing={6} align="start">
                <SkeletonCircle size="32" />
                <VStack align="start" flex={1} spacing={4}>
                  <Skeleton height="30px" width="200px" />
                  <SkeletonText mt="4" noOfLines={2} spacing="4" width="full" />
                  <Skeleton height="20px" width="100px" />
                </VStack>
              </HStack>
            </Box>
          </Box>

          {/* Posts Skeleton */}
          <Box>
            <Skeleton height="30px" width="100px" mb={4} />
            <Stack spacing={4}>
              {[1, 2, 3].map((i) => (
                <Box key={i} p={4} borderWidth="1px" borderRadius="lg">
                  <Skeleton height="20px" width="150px" mb={4} />
                  <SkeletonText noOfLines={3} spacing="4" />
                </Box>
              ))}
            </Stack>
          </Box>
        </VStack>
      </Container>
    );
  }

  return (
    <>
      <VStack spacing={8} align="stretch">
        {/* Cover Image */}
        <Box
          h={{ base: "200px", md: "300px", lg: "400px" }}
          w="full" //
          bg="gray.100"
          borderRadius="lg"
          position="relative"
          overflow="hidden"
        >
          {profileUser?.cover_image ? (
            <CoverImg
              src={profileUser?.cover_image[0]?.url} //
              alt="Cover"
              w="full"
              h="full"
              objectFit="cover"
            />
          ) : (
            <Box w="full" h="full" bg="gray.200" display="flex" alignItems="center" justifyContent="center">
              <Icon as={FaImage} w={{ base: 8, md: 12 }} h={{ base: 8, md: 12 }} color="gray.400" />
            </Box>
          )}
        </Box>

        {/* Profile Info */}
        <Box
          bg={bgColor}
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px" //
          borderColor={borderColor}
          p={{ base: 4, md: 6 }}
          position="relative"
          mt={{ base: "-60px", md: "-100px" }}
        >
          <HStack spacing={{ base: 4, md: 6 }} align="start" flexDir={{ base: "column", md: "row" }}>
            <AvatarImg
              size={{ base: "xl", md: "2xl" }} //
              src={isAvatar}
              borderWidth="4px"
              borderColor={bgColor}
            />
            <VStack align="start" flex={1} spacing={4} w={"100%"}>
              <UserName
                name={profileUser?.name}
                textColor={textColor}
                isVerified={profileUser?.is_tick} //
                fontSize={{ base: "xl", md: "2xl" }}
              />

              <Text color={textColor} fontSize={{ base: "sm", md: "md" }}>
                {profileUser?.bio || "Chưa có mô tả"}
              </Text>

              <StatGroup w="full">
                <Stat>
                  <StatLabel color={secondaryTextColor} fontSize={{ base: "sm", md: "md" }}>
                    Bài viết
                  </StatLabel>
                  <StatNumber color={textColor} fontSize={{ base: "lg", md: "xl" }}>
                    {profileUser?.posts_count || 0}
                  </StatNumber>
                </Stat>
              </StatGroup>

              {isMe && (
                <Button leftIcon={<FaUserEdit />} colorScheme="blue" variant="outline" onClick={() => setIsEditModalOpen(true)} size={{ base: "sm", md: "md" }} width="100%">
                  Chỉnh sửa trang cá nhân
                </Button>
              )}
            </VStack>
          </HStack>
        </Box>

        {/* Tabs Section */}

        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab>
              <HStack spacing={2}>
                <Icon as={FaNewspaper} />
                <Text>Bài viết</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Icon as={FaImage} />
                <Text>Ảnh</Text>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels mt={4}>
            <TabPanel p={0}>
              {isMe && <CreatePost mb={2} />}
              <PostList posts={profileUser?.posts} />
            </TabPanel>

            {/* Images Tab */}
            <TabPanel p={0} pb={6}>
              <ImagesTabProfile
                profileUser={profileUser} //
                handleImageClick={handleImageClick}
                onSetAsImage={handleSetProfileImage}
                onDeleteImage={handleDeleteProfileImage}
                isMe={isMe}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Image Preview Modal */}
        <Modal isOpen={isImageModalOpen} onClose={onImageModalClose} size="6xl">
          <ModalOverlay />
          <ModalContent bg={bgColor}>
            <ModalCloseButton />
            <ModalBody p={0}>{selectedImage && <Image src={selectedImage.url} alt="Preview" w="full" h="auto" objectFit="contain" />}</ModalBody>
          </ModalContent>
        </Modal>

        {/* Edit Profile Modal */}
        <EditProfile isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} profileUser={profileUser} onUpdate={handleUpdateProfile} />
      </VStack>
    </>
  );
}
