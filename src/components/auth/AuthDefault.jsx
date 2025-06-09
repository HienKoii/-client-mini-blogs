import React from "react";
import { Link, useLocation } from "react-router-dom";
import PATH from "../../utils/path";
import { Button } from "@chakra-ui/react";

export default function AuthDefault() {
  const location = useLocation();
  return (
    <Button
      as={Link}
      to={PATH.login} //
      size={{ base: "sm", md: "md" }}
      colorScheme="blue"
      variant={location.pathname === PATH.login ? "solid" : "outline"}
    >
      Đăng nhập
    </Button>
  );
}
