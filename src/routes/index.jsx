import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Posts from "../pages/Posts";
import Write from "../pages/Write";
import Login from "../pages/Login";
import PATH from "../utils/path";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: PATH.home,
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: PATH.posts,
        element: <Posts />,
      },
      {
        path: PATH.write,
        element: <Write />,
      },
      {
        path: PATH.login,
        element: <Login />,
      },
      {
        path: PATH.register,
        element: <Register />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
