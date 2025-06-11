import { Menu, MenuButton, MenuList, MenuItem, IconButton, useColorModeValue } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";

const PostMenu = ({ onEdit, onDelete, isOwner }) => {
  const menuBg = useColorModeValue("white", "gray.800");
  const menuBorderColor = useColorModeValue("gray.200", "gray.700");
  const menuItemHoverBg = useColorModeValue("gray.100", "gray.700");

  if (!isOwner) return null;

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<BsThreeDots />} variant="ghost" size="sm" />
      <MenuList bg={menuBg} borderColor={menuBorderColor}>
        <MenuItem icon={<FaEdit />} onClick={onEdit} _hover={{ bg: menuItemHoverBg }}>
          Chỉnh sửa
        </MenuItem>
        <MenuItem icon={<FaTrash />} onClick={onDelete} _hover={{ bg: menuItemHoverBg }} color="red.500">
          Xóa
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PostMenu;
