import {
  Box,
  HStack,
  Input,
  Button,
  Divider,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Image,
  VStack,
  useDisclosure,
  SimpleGrid,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FaImage, FaSmile, FaTimes, FaGlobe, FaLock, FaChevronDown } from "react-icons/fa";
import AvatarImg from "../Images/AvatarImg";
import PATH from "../../utils/path";
import { useContext, useState } from "react";
import PostsServices from "../../services/PostsServices";
import UserContext from "../../contexts/UserContext";

const CreatePost = (props) => {
  const toast = useToast();
  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [privacy, setPrivacy] = useState("public");
  const [isLoading, setIsLoading] = useState(false);

  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const thumbColor = useColorModeValue("rgba(0,0,0,0.3)", "rgba(255,255,255,0.3)");

  const privacyOptions = [
    { value: "public", label: "Công khai", icon: FaGlobe, description: "Mọi người có thể xem bài viết của bạn" },
    { value: "private", label: "Chỉ mình tôi", icon: FaLock, description: "Chỉ bạn có thể xem bài viết của bạn" },
  ];

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map((file) => ({
      file,
      type: file.type.startsWith("image/") ? "image" : "video",
      preview: URL.createObjectURL(file),
    }));
    setMedia([...media, ...newMedia]);
  };

  const removeMedia = (index) => {
    const newMedia = [...media];
    URL.revokeObjectURL(newMedia[index].preview);
    newMedia.splice(index, 1);
    setMedia(newMedia);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      console.log({ content, media, privacy });
      await PostsServices.create({ content, media, privacy });
      setContent("");
      media.forEach((m) => URL.revokeObjectURL(m.preview));
      setMedia([]);
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

  const getPrivacyIcon = () => {
    const option = privacyOptions.find((opt) => opt.value === privacy);
    return option ? <option.icon /> : <FaGlobe />;
  };

  const getPrivacyLabel = () => {
    const option = privacyOptions.find((opt) => opt.value === privacy);
    return option ? option.label : "Công khai";
  };

  return (
    <>
      <Box
        {...props}
        bg={bgColor}
        p={4} //
        borderRadius="lg"
        boxShadow="sm"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <HStack spacing={4} mb={4}>
          <AvatarImg size="md" src={user?.avatar?.[0]?.url} cursor={"pointer"} to={PATH.profileId(user?.id)} />
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
        <Divider borderColor={borderColor} mb={4} />
        <HStack spacing={4} justify="center">
          <Button as="label" leftIcon={<FaImage />} variant="ghost" colorScheme="green" cursor="pointer" onClick={onOpen}>
            Ảnh/Video
          </Button>
          <Button leftIcon={<FaSmile />} variant="ghost" colorScheme="yellow">
            Cảm xúc
          </Button>
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={bgColor}>
          <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
            Tạo bài viết
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={4}>
            <VStack spacing={4} align="stretch">
              <HStack spacing={4}>
                <AvatarImg size="md" cursor={"pointer"} to={PATH.profile} />
                <Box flex="1">
                  <Text fontWeight="bold" color={textColor}>
                    {user?.name}
                  </Text>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<FaChevronDown />} //
                      leftIcon={getPrivacyIcon()}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      bg={borderColor}
                    >
                      {getPrivacyLabel()}
                    </MenuButton>
                    <MenuList>
                      {privacyOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          icon={<option.icon />} //
                          onClick={() => setPrivacy(option.value)}
                        >
                          <Box>
                            <Text fontWeight="bold">{option.label}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {option.description}
                            </Text>
                          </Box>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Box>
              </HStack>

              <VStack
                overflowY={"scroll"}
                maxH={`350px`}
                sx={{
                  "&::-webkit-scrollbar": { width: "8px" },
                  "&::-webkit-scrollbar-track": { background: "transparent" },
                  "&::-webkit-scrollbar-thumb": {
                    background: thumbColor,
                    borderRadius: "8px",
                  },
                  scrollbarWidth: "thin",
                  scrollbarColor: `${thumbColor} transparent`,
                }}
              >
                <Textarea placeholder="Bạn đang nghĩ gì?" value={content} onChange={(e) => setContent(e.target.value)} resize="none" fontSize="lg" />

                {media.length > 0 && (
                  <Box>
                    <SimpleGrid columns={2} spacing={4}>
                      {media.map((item, index) => (
                        <Box key={index} position="relative">
                          {item.type === "image" ? (
                            <Image src={item.preview} w="full" h="200px" objectFit="cover" borderRadius="md" />
                          ) : (
                            <video src={item.preview} controls style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "0.375rem" }} />
                          )}
                          <IconButton position="absolute" top={2} right={2} size="sm" colorScheme="red" icon={<FaTimes />} onClick={() => removeMedia(index)} />
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>
                )}
              </VStack>

              <HStack spacing={4} justify="space-between" pt={4} borderTopWidth="1px" borderColor={borderColor}>
                <Button as="label" leftIcon={<FaImage />} variant="ghost" colorScheme="green" cursor="pointer">
                  Thêm Ảnh/Video
                  <input type="file" accept="image/*,video/*" multiple hidden onChange={handleMediaChange} />
                </Button>
                <Button colorScheme="blue" isDisabled={(!content.trim() && media.length === 0) || isLoading} onClick={handleSubmit} leftIcon={isLoading ? <Spinner size="sm" /> : null}>
                  {isLoading ? "Đang đăng..." : "Đăng"}
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
