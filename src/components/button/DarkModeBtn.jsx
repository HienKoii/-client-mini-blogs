import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function DarkModeBtn() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <IconButton
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        variant="ghost" //
        aria-label="Toggle color mode"
        // display={{ base: "none", md: "flex" }}
      />
    </>
  );
}
