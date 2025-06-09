import React from "react";
import { Link } from "react-router-dom";
import PATH from "../../utils/path";
import { Heading } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Heading as={Link} to={PATH.home} size="md" cursor="pointer">
      Mini Blog
    </Heading>
  );
}
