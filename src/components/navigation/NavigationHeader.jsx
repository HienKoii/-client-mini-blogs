import { Button, HStack, VStack } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PATH from "../../utils/path";
import DarkModeBtn from "../button/darkModeBtn";
import DrawerNavigation from "../drawer/DrawerNavigation";

const navigationLinks = [
  { path: PATH.home, label: "Trang chủ" },
  { path: PATH.posts, label: "Bài viết" },
  { path: PATH.write, label: "Viết bài" },
];

const NavigationHeader = ({ onClick = null, isMobile = false, isOpen, onClose }) => {
  const location = useLocation();

  const renderNavLinks = () => {
    return navigationLinks.map((link) => {
      const isActive = location.pathname === link.path;
      return (
        <Button
          key={link.path}
          as={RouterLink}
          to={link.path}
          variant="ghost"
          color={isActive ? "blue.500" : "gray.600"}
          _hover={{
            bg: "transparent",
            color: "blue.500",
          }}
          onClick={onClick}
        >
          {link.label}
        </Button>
      );
    });
  };

  if (isMobile) {
    return <DrawerNavigation isOpen={isOpen} onClose={onClose} navLinks={navigationLinks} />;
  }

  return (
    <HStack spacing={8} display={{ base: "none", md: "flex" }} justify="center">
      {renderNavLinks()}
    </HStack>
  );
};

export default NavigationHeader;
