import React, { useContext } from "react";
import { Menu, MenuButton, MenuList, MenuItem, Icon, useColorModeValue, Divider } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

import AvatarImg from "../Images/AvatarImg";
import PATH from "../../utils/path";
import UserContext from "../../contexts/UserContext";

export default function AuthLogin() {
  const { logout, user } = useContext(UserContext);

  const isAvatar = user?.avatar && user?.avatar.length > 0 ? user?.avatar[0]?.url : null;

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Menu>
      <MenuButton as={AvatarImg} src={isAvatar} size="sm" cursor={"pointer"}></MenuButton>
      <MenuList bg={bgColor} borderColor={borderColor}>
        <MenuItem as={RouterLink} to={PATH.profileId(user?.id)} icon={<Icon as={FaUser} />}>
          Xin chào, {user.name}
        </MenuItem>
        <Divider mt={2} />
        <MenuItem
          icon={<Icon as={FaSignOutAlt} />} //
          color="red.500"
          onClick={() => logout()}
        >
          Đăng xuất
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
