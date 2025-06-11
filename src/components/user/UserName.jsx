import { HStack, Text, Icon } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom"; // Đổi tên tránh trùng Chakra UI Link
import { Link as ChakraLink } from "@chakra-ui/react"; // Optional: nếu muốn giữ style Chakra

const UserName = ({ name, to, isVerified, textColor = "gray.800", iconProps = {}, ...rest }) => {
  const NameContent = (
    <Text fontWeight="bold" color={textColor} {...rest}>
      {name}
    </Text>
  );

  return (
    <HStack spacing={1} align="center">
      {to ? (
        <ChakraLink as={RouterLink} to={to} _hover={{ textDecoration: "underline" }}>
          {NameContent}
        </ChakraLink>
      ) : (
        NameContent
      )}

      {isVerified && <Icon as={FaCheckCircle} color="blue.500" boxSize={4} {...iconProps} />}
    </HStack>
  );
};

export default UserName;
