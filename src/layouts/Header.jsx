import { Box, Container, Heading, useColorModeValue, IconButton, useDisclosure, CloseButton, HStack } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import PATH from "../utils/path";

import Auth from "../components/auth/Auth";
import NavigationHeader from "../components/navigation/NavigationHeader";
import DarkModeBtn from "../components/darkMode/DarkModeBtn";
import Logo from "../components/logo/Logo";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      as="header"
      position="fixed"
      w="100%" //
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      zIndex="1000"
    >
      <Container
        maxW="container.lg"
        h="16" //
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Left section - Logo */}
        <IconButton
          display={{ base: "flex", md: "none" }} //
          onClick={onOpen}
          icon={<HamburgerIcon />}
          variant="ghost"
          aria-label="Open menu"
        />
        <Logo />

        {/* Center section - Navigation */}
        <NavigationHeader />

        {/* Right section - Login */}
        <HStack spacing={2}>
          <Auth />
          <DarkModeBtn />
        </HStack>
      </Container>

      {/* Mobile Navigation */}
      <NavigationHeader onClick={onClose} isMobile isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Header;
