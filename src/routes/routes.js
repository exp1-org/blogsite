import { createBrowserRouter } from "react-router-dom";
import SignIn, { action as loginAction } from "../components/login/SignIn";
import SignUp, { action as signUpAction } from "../components/login/SignUp";
import { action as logoutAction } from "../pages/Logout";
import { action as blogHandlerAction } from "../components/blog/create/BlogForm";
import Home, { loader as allBlogsLoader } from "../components/home/Home";
import Blog, {
  loader as blogLoader,
  action as deleteAction,
} from "../components/blog/Blog";
import { getIsLoggedIn, checkAuthLoader } from "../utils/auth";

import RootLayout from "./RootLayout";
import EditBlog from "../pages/EditBlog";
import CreateBlog from "../pages/CreateBlog";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    loader: getIsLoggedIn,
    id: "token-loader",
    children: [
      { index: true, element: <SignIn />, action: loginAction },
      { path: "register", element: <SignUp />, action: signUpAction },
      { path: "login", element: <SignIn />, action: loginAction },
      { path: "logout", action: logoutAction },
      {
        path: "blogs",
        id: "all-blogs",
        loader: allBlogsLoader,
        // action: searchBlogsHandler,
        children: [
          { index: true, element: <Home /> },
          {
            path: ":id",
            loader: blogLoader,
            action: deleteAction,
            id: "single-blog",
            children: [
              { index: true, element: <Blog /> },
              {
                path: "edit",
                element: <EditBlog />,
                action: blogHandlerAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "create",
            element: <CreateBlog />,
            action: blogHandlerAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "myBlogs",
        element: <Home />,
        loader: allBlogsLoader,
        id: "my-blogs",
      },
    ],
  },
]);

export default router;
