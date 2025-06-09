import { useContext, useState } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, Text, useToast, InputGroup, InputRightElement, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PATH from "../utils/path";
import UserContext from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData);
      navigate(PATH.home);
    } catch (error) {
      toast({
        title: "Đăng nhập thất bại",
        description: error.response?.data?.message || "Vui lòng thử lại sau",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box p={8} bg={bgColor} borderRadius="lg" boxShadow="lg" borderWidth="1px" borderColor={borderColor}>
        <VStack spacing={6}>
          <Heading size="lg" textAlign="center">
            Đăng nhập
          </Heading>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Nhập email của bạn" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Mật khẩu</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Nhập mật khẩu của bạn" />
                  <InputRightElement>
                    <IconButton variant="ghost" aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} icon={showPassword ? <FaEyeSlash /> : <FaEye />} onClick={() => setShowPassword(!showPassword)} />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button type="submit" colorScheme="blue" width="full" isLoading={isLoading} loadingText="Đang đăng nhập...">
                Đăng nhập
              </Button>
            </VStack>
          </form>

          <Text fontSize="sm" textAlign="center">
            Chưa có tài khoản?{" "}
            <Text as={RouterLink} to={PATH.register} color="blue.500" _hover={{ textDecoration: "underline" }}>
              Đăng ký ngay
            </Text>
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default Login;
