import { Box, HStack, Text, Button, Textarea, useColorModeValue, VStack, Menu, MenuButton, MenuList, MenuItem, SimpleGrid, Image, IconButton, Spinner } from "@chakra-ui/react";
import { FaGlobe, FaLock, FaChevronDown, FaImage, FaTimes } from "react-icons/fa";
import { useState, useContext } from "react";
import AvatarImg from "../Images/AvatarImg";
import PATH from "../../utils/path";
import UserContext from "../../contexts/UserContext";

const PostForm = ({ postId, initialContent = "", initialStatus = 0, initialMedia = [], onSubmit, submitText = "Đăng", isSubmitting = false }) => {
  const { user } = useContext(UserContext);

  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState(initialStatus);
  const [oldMedias, setOldMedias] = useState(initialMedia); // chứa ảnh từ Cloudinary (url + public_id)
  const [newMedias, setNewMedias] = useState([]); // chứa file mới upload

  const textColor = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const thumbColor = useColorModeValue("rgba(0,0,0,0.3)", "rgba(255,255,255,0.3)");

  const privacyOptions = [
    { value: 0, label: "Công khai", icon: FaGlobe, description: "Mọi người có thể xem bài viết của bạn" },
    { value: 1, label: "Chỉ mình tôi", icon: FaLock, description: "Chỉ bạn có thể xem bài viết của bạn" },
  ];

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      file,
      type: file.type.startsWith("image/") ? "image" : "video",
      preview: URL.createObjectURL(file),
    }));
    setNewMedias([...newMedias, ...newFiles]);
  };

  const removeMedia = (index, isOld = false) => {
    if (isOld) {
      const newOld = [...oldMedias];
      newOld.splice(index, 1);
      setOldMedias(newOld);
    } else {
      const newNew = [...newMedias];
      URL.revokeObjectURL(newNew[index].preview);
      newNew.splice(index, 1);
      setNewMedias(newNew);
    }
  };

  const handleSubmit = async () => {
    const keepMedias = oldMedias.map((item) => item);
    console.log("keepMedias", keepMedias);

    const data = {
      content,
      status,
      postId,
      keepMedias,
      media: newMedias, // chứa các file mới
    };

    await onSubmit(data);
  };

  const getPrivacyIcon = () => {
    const option = privacyOptions.find((opt) => opt.value === status);
    return option ? <option.icon /> : <FaGlobe />;
  };

  const getPrivacyLabel = () => {
    const option = privacyOptions.find((opt) => opt.value === status);
    return option ? option.label : "Công khai";
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={4}>
        <AvatarImg size="md" src={user?.avatar?.[0]?.url} cursor={"pointer"} to={PATH.profileId(user?.id)} />
        <Box flex="1">
          <Text fontWeight="bold" color={textColor}>
            {user?.name}
          </Text>
          <Menu>
            <MenuButton as={Button} rightIcon={<FaChevronDown />} leftIcon={getPrivacyIcon()} size="sm" variant="ghost" colorScheme="blue" bg={borderColor}>
              {getPrivacyLabel()}
            </MenuButton>
            <MenuList>
              {privacyOptions.map((option) => (
                <MenuItem key={option.value} icon={<option.icon />} onClick={() => setStatus(option.value)}>
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

        {(oldMedias.length > 0 || newMedias.length > 0) && (
          <Box>
            <SimpleGrid columns={2} spacing={4}>
              {/* Ảnh cũ */}
              {oldMedias.map((item, index) => (
                <Box key={`old-${index}`} position="relative">
                  {item.type === "image" ? (
                    <Image src={item.url} w="full" h="200px" objectFit="cover" borderRadius="md" />
                  ) : (
                    <video src={item.url} controls style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "0.375rem" }} />
                  )}
                  <IconButton
                    position="absolute"
                    top={2}
                    right={2} //
                    size="sm"
                    colorScheme="red"
                    icon={<FaTimes />}
                    onClick={() => removeMedia(index, true)}
                  />
                </Box>
              ))}

              {/* Ảnh mới */}
              {newMedias.map((item, index) => (
                <Box key={`new-${index}`} position="relative">
                  {item.type === "image" ? (
                    <Image src={item.preview} w="full" h="200px" objectFit="cover" borderRadius="md" />
                  ) : (
                    <video src={item.preview} controls style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "0.375rem" }} />
                  )}
                  <IconButton position="absolute" top={2} right={2} size="sm" colorScheme="red" icon={<FaTimes />} onClick={() => removeMedia(index, false)} />
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
        <Button colorScheme="blue" isDisabled={(!content.trim() && oldMedias.length === 0 && newMedias.length === 0) || isSubmitting} onClick={handleSubmit} leftIcon={isSubmitting ? <Spinner size="sm" /> : null}>
          {isSubmitting ? "Đang xử lý..." : submitText}
        </Button>
      </HStack>
    </VStack>
  );
};

export default PostForm;
