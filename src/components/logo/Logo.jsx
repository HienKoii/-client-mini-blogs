import React from "react";
import { Link } from "react-router-dom";
import PATH from "../../utils/path";
import { Heading, HStack, Image } from "@chakra-ui/react";

export default function Logo() {
  return (
    <HStack>
      <Image src="/logo.png" alt="logo" w={35} h={35} />
      <Heading as={Link} to={PATH.home} size="md" cursor="pointer">
        HK Blog
      </Heading>
    </HStack>
  );
}
