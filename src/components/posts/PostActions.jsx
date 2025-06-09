import { Button, HStack } from "@chakra-ui/react";
import { FaBookmark, FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";

export default function PostActions({ post, isLiked, isSaved, handleSave, secondaryTextColor, textColor, handleLike }) {
  return (
    <HStack p={4} spacing={4} justify="space-between">
      <Button
        flex="1"
        variant="ghost"
        leftIcon={isLiked ? <FaHeart color="red.500" /> : <FaRegHeart />}
        color={isLiked ? "red.500" : secondaryTextColor}
        _hover={{ color: isLiked ? "red.500" : textColor }}
        onClick={handleLike}
      >
        Thích ({post.likes})
      </Button>
      <Button flex="1" variant="ghost" leftIcon={<FaRegComment />} color={secondaryTextColor} _hover={{ color: textColor }}>
        Bình luận ({post.comments})
      </Button>
      <Button flex="1" variant="ghost" leftIcon={<FaBookmark />} color={isSaved ? "blue.500" : secondaryTextColor} _hover={{ color: textColor }} onClick={handleSave}>
        {isSaved ? "Đã lưu" : "Lưu"}
      </Button>
    </HStack>
  );
}
