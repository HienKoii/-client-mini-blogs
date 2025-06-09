import { useState } from "react";
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, Text, useToast, InputGroup, InputRightElement, IconButton, useColorModeValue, FormErrorMessage } from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PATH from "../utils/path";
import AuthServices from "../services/AuthServices";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const validateForm = () => {
    const newErrors = {};

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Tên người dùng là bắt buộc";
    } else if (formData.username.length < 3) {
      newErrors.username = "Tên người dùng phải có ít nhất 3 ký tự";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await AuthServices.register(formData);
      toast({
        title: "Đăng ký thành công",
        description: "Vui lòng đăng nhập để tiếp tục",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate(PATH.login);
    } catch (error) {
      console.error("Lỗi đăng ký:", error.response?.data?.message);
      toast({
        title: "Đăng ký thất bại",
        description: error.response?.data?.message || "Vui lòng thử lại sau",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
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
            Đăng ký tài khoản
          </Heading>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <VStack spacing={4}>
              <FormControl isRequired isInvalid={errors.username}>
                <FormLabel>Tên người dùng</FormLabel>
                <Input name="username" value={formData.username} onChange={handleChange} placeholder="Nhập tên người dùng" />
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Nhập email của bạn" />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.password}>
                <FormLabel>Mật khẩu</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Nhập mật khẩu của bạn" />
                  <InputRightElement>
                    <IconButton variant="ghost" aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"} icon={showPassword ? <FaEyeSlash /> : <FaEye />} onClick={() => setShowPassword(!showPassword)} />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={errors.confirmPassword}>
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <InputGroup>
                  <Input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Nhập lại mật khẩu" />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>

              <Button type="submit" colorScheme="blue" width="full" isLoading={isLoading} loadingText="Đang đăng ký...">
                Đăng ký
              </Button>
            </VStack>
          </form>

          <Text fontSize="sm" textAlign="center">
            Đã có tài khoản?{" "}
            <Text as={RouterLink} to={PATH.login} color="blue.500" _hover={{ textDecoration: "underline" }}>
              Đăng nhập
            </Text>
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default Register;
