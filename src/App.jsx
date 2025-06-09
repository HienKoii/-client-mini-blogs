import { ChakraProvider, Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./layouts/Header";

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Container
        maxW="container.lg"
        as="main"
        pt="16" //
        mt={2}
        w={"100%"}
        h={"100%"}
        minH={"100vh"}
      >
        <Outlet />
      </Container>
    </ChakraProvider>
  );
}

export default App;
