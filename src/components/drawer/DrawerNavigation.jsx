import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex } from "@chakra-ui/react";
import Logo from "../logo/Logo";
import { Link } from "react-router-dom";

export default function DrawerNavigation({ isOpen, onClose, navLinks }) {
  return (
    <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          <Logo />
        </DrawerHeader>
        <DrawerBody>
          <Flex direction={"column"} justifyContent={"center"} gap={4}>
            {navLinks?.map((item, index) => {
              return (
                <Button
                  key={index}
                  as={Link}
                  to={item.path} //
                  variant={"ghost"}
                  _hover={{
                    bg: "transparent",
                    color: "blue.500",
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
