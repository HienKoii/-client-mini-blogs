import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles/index.css";
import { UserProvider } from "./providers/UserProvider";
import { PostsProvider } from "./providers/PostsProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <PostsProvider>
          <RouterProvider router={router} />
        </PostsProvider>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);
