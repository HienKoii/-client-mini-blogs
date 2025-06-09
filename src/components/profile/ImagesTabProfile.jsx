import { Box, Image, SimpleGrid, Text, VStack, Icon, Center, IconButton, Menu, MenuButton, MenuList, MenuItem, useColorModeValue } from "@chakra-ui/react";
import { FaImage, FaEdit, FaTrash, FaUser, FaImage as FaCoverImage } from "react-icons/fa";
import React from "react";

export default function ImagesTabProfile({ profileUser, handleImageClick, onDeleteImage, onSetAsImage, isMe }) {
  const bgColor = useColorModeValue("white", "gray.800");
  const hoverBgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const ImageWithMenu = ({ image, type }) => (
    <Box position="relative" cursor="pointer" _hover={{ opacity: 0.8 }}>
      <Image
        src={image.url}
        alt={`${type} image`} //
        borderRadius="md"
        w="full"
        h="200px"
        objectFit="cover"
        onClick={() => handleImageClick(image)}
      />
      {isMe && (
        <Menu placement="bottom-end" strategy="fixed">
          <MenuButton
            as={IconButton}
            icon={<FaEdit />}
            variant="ghost" //
            position="absolute"
            top={2}
            right={2}
            size="sm"
            bg={bgColor}
            _hover={{ bg: hoverBgColor }}
            onClick={(e) => e.stopPropagation()}
          />
          <MenuList zIndex={999}>
            {type === "avatar" ? (
              <MenuItem
                icon={<FaUser />}
                onClick={(e) => {
                  e.stopPropagation();
                  onSetAsImage(image, type);
                }}
              >
                Đặt làm ảnh đại diện
              </MenuItem>
            ) : (
              <MenuItem
                icon={<FaCoverImage />}
                onClick={(e) => {
                  e.stopPropagation();
                  onSetAsImage(image, type);
                }}
              >
                Đặt làm ảnh bìa
              </MenuItem>
            )}
            <MenuItem
              icon={<FaTrash />}
              color="red.500"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteImage(image, type);
              }}
            >
              Xóa ảnh
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  );

  const EmptyState = () => (
    <Center py={8} w="full">
      <VStack spacing={4}>
        <Icon as={FaImage} w={12} h={12} color="gray.400" />
        <Text color="gray.500">Chưa có ảnh nào</Text>
      </VStack>
    </Center>
  );

  return (
    <VStack align="start" spacing={6} w="full">
      {/* Avatars */}
      <Box w="full">
        <Text fontSize="xl" fontWeight="bold" mb={4} color={textColor}>
          Ảnh đại diện
        </Text>
        {profileUser?.listAvatar && profileUser.listAvatar.length > 0 ? (
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            {profileUser.listAvatar.map((img, index) => (
              <ImageWithMenu key={index} image={img} type="avatar" />
            ))}
          </SimpleGrid>
        ) : (
          <EmptyState />
        )}
      </Box>

      {/* Cover Images */}
      <Box w="full">
        <Text fontSize="xl" fontWeight="bold" mb={4} color={textColor}>
          Ảnh bìa
        </Text>
        {profileUser?.listCoverImage && profileUser.listCoverImage.length > 0 ? (
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            {profileUser.listCoverImage.map((img, index) => (
              <ImageWithMenu key={index} image={img} type="cover" />
            ))}
          </SimpleGrid>
        ) : (
          <EmptyState />
        )}
      </Box>
    </VStack>
  );
}
