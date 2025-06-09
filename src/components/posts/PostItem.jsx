import { Box, HStack, Text, IconButton, Image, Divider, useColorModeValue, SimpleGrid, Flex } from "@chakra-ui/react";
import { FaLock, FaGlobe } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import AvatarImg from "../Images/AvatarImg";
import PATH from "../../utils/path";
import PostActions from "./PostActions";
import { formatDate } from "../../utils/util";

const PostItem = ({ post }) => {
  const avatarUrl = JSON.parse(post?.user_avatar || "[]")[0]?.url;
  const mediaData = JSON.parse(post?.media || "[]");

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleMediaClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const renderMedia = () => {
    if (!mediaData || mediaData.length === 0) return null;

    if (mediaData.length === 1) {
      return (
        <Box cursor="pointer" onClick={() => handleMediaClick(0)}>
          {mediaData[0].type === "image" ? (
            <Flex justifyContent={"center"}>
              <Image
                src={mediaData[0].url}
                w={mediaData[0].width} //
                h={mediaData[0].height}
                maxH="500px"
                objectFit="cover"
                borderRadius="md"
              />{" "}
            </Flex>
          ) : (
            <Flex justifyContent={"center"}>
              <video
                src={mediaData[0].url} //
                controls
                style={{ width: `${mediaData[0].width}px`, height: `${mediaData[0].height}px`, objectFit: "cover", borderRadius: "0.375rem" }}
              />{" "}
            </Flex>
          )}
        </Box>
      );
    }

    if (mediaData.length === 2) {
      return (
        <SimpleGrid columns={2} spacing={2}>
          {mediaData.map((item, index) => (
            <Box key={index} cursor="pointer" onClick={() => handleMediaClick(index)}>
              {item.type === "image" ? (
                <Image src={item.url} w="full" h="300px" objectFit="cover" borderRadius="md" />
              ) : (
                <video src={item.url} controls style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "0.375rem" }} />
              )}
            </Box>
          ))}
        </SimpleGrid>
      );
    }

    if (mediaData.length === 3) {
      return (
        <SimpleGrid columns={2} spacing={2}>
          <Box cursor="pointer" onClick={() => handleMediaClick(0)} gridColumn="span 2">
            {mediaData[0].type === "image" ? (
              <Image src={mediaData[0].url} w="full" h="400px" objectFit="cover" borderRadius="md" />
            ) : (
              <video src={mediaData[0].url} controls style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "0.375rem" }} />
            )}
          </Box>
          {mediaData.slice(1).map((item, index) => (
            <Box key={index} cursor="pointer" onClick={() => handleMediaClick(index + 1)}>
              {item.type === "image" ? (
                <Image src={item.url} w="full" h="200px" objectFit="cover" borderRadius="md" />
              ) : (
                <video src={item.url} controls style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "0.375rem" }} />
              )}
            </Box>
          ))}
        </SimpleGrid>
      );
    }

    if (mediaData.length === 4) {
      return (
        <SimpleGrid columns={2} spacing={2}>
          {mediaData.map((item, index) => (
            <Box key={index} cursor="pointer" onClick={() => handleMediaClick(index)}>
              {item.type === "image" ? (
                <Image src={item.url} w="full" h="200px" objectFit="cover" borderRadius="md" />
              ) : (
                <video src={item.url} controls style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "0.375rem" }} />
              )}
            </Box>
          ))}
        </SimpleGrid>
      );
    }

    // For 5 or more images
    return (
      <SimpleGrid columns={2} spacing={2}>
        {mediaData.slice(0, 3).map((item, index) => (
          <Box key={index} cursor="pointer" onClick={() => handleMediaClick(index)} gridColumn={index === 0 ? "span 1" : "span 1"} gridRow={index === 0 ? "span 2" : "span 1"} position="relative">
            {item.type === "image" ? (
              <Image src={item.url} w="full" h={index === 0 ? "400px" : "195px"} objectFit="cover" borderRadius="md" />
            ) : (
              <video
                src={item.url}
                controls
                style={{
                  width: "100%",
                  height: index === 0 ? "400px" : "195px",
                  objectFit: "cover",
                  borderRadius: "0.375rem",
                }}
              />
            )}
            {index === 2 && mediaData.length > 3 && (
              <Box position="absolute" top={0} left={0} right={0} bottom={0} bg="rgba(0,0,0,0.5)" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                <Text color="white" fontSize="2xl" fontWeight="bold">
                  +{mediaData.length - 3}
                </Text>
              </Box>
            )}
          </Box>
        ))}
      </SimpleGrid>
    );
  };

  const slides =
    mediaData?.map((item) => ({
      type: item.type,
      src: item.url,
      ...(item.type === "video" && { poster: item.url.replace(".mp4", ".jpg") }),
    })) || [];

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      boxShadow="sm" //
      overflow="hidden"
      borderWidth="1px"
      borderColor={borderColor}
    >
      {/* Post Header */}
      <HStack p={4} spacing={4}>
        <AvatarImg to={PATH.profileId(post?.user_id)} src={avatarUrl} />
        <Box flex="1">
          <HStack>
            <Text fontWeight="bold" color={textColor}>
              {post?.user_name}
            </Text>
          </HStack>
          <HStack spacing={0}>
            <IconButton
              icon={
                post.status === 0 ? ( //
                  <FaGlobe />
                ) : (
                  <FaLock />
                )
              }
              justifyContent={"start"}
              size="xs"
              variant="ghost"
              color={secondaryTextColor}
              aria-label={post.status === 0 ? "Public post" : "Private post"}
            />
            <Text fontSize="sm" color={secondaryTextColor}>
              {formatDate(post.created_at)}
            </Text>
          </HStack>
        </Box>
        <IconButton
          icon={<BsThreeDots />} //
          variant="ghost"
          color={secondaryTextColor}
          _hover={{ color: textColor }}
        />
      </HStack>

      {/* Post Content */}
      <Box px={4} pb={4}>
        <Text mb={4} color={textColor}>
          {post.content}
        </Text>
        {renderMedia()}
      </Box>

      {/* Post Actions */}
      <Divider borderColor={borderColor} />
      <PostActions
        post={post} //
        isLiked={isLiked}
        isSaved={isSaved}
        handleSave={handleSave}
        secondaryTextColor={secondaryTextColor}
        textColor={textColor}
        handleLike={handleLike}
      />

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
        animation={{ fade: 300 }}
        zoom={{ maxZoomPixelRatio: 3 }}
        thumbnails={{ width: 120, height: 80, padding: 4, gap: 8 }}
      />
    </Box>
  );
};

export default PostItem;
