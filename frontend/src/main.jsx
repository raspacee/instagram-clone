import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Cookies from "universal-cookie";
import ProfileMe from "./routes/profile/me.jsx";
import ProfileOther from "./routes/profile/other.jsx";
import Home from "./routes/home.jsx";
import Login from "./routes/login.jsx";
import Signup from "./routes/signup.jsx";
import Explore from "./routes/explore.jsx";
import CreatePost from "./routes/create.jsx";
import PostDetail from "./routes/postDetail.jsx";

function isAuthenticated() {
  const cookies = new Cookies(import.meta.env.VITE_COOKIES_NAME, { path: "/" });
  if (cookies.get("accessToken")) {
    return true;
  }
  return false;
}

const protectedLoader = ({ request }) => {
  if (!isAuthenticated()) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
};

const unprotectedLoader = () => {
  if (isAuthenticated()) {
    return redirect("/home");
  }
  return null;
};

const redirectToHome = async () => {
  return redirect("/home");
};

const router = createBrowserRouter([
  {
    path: "/",
    loader: redirectToHome,
  },
  {
    path: "/home",
    element: <Home />,
    loader: protectedLoader,
  },
  {
    path: "/login",
    element: <Login />,
    loader: unprotectedLoader,
  },
  {
    path: "/signup",
    element: <Signup />,
    loader: unprotectedLoader,
  },
  {
    path: "/explore",
    element: <Explore />,
    loader: protectedLoader,
  },
  {
    path: "/profile/me",
    element: <ProfileMe />,
    loader: protectedLoader,
  },
  {
    path: "/profile/:query",
    element: <ProfileOther />,
    loader: protectedLoader,
  },
  {
    path: "/create",
    element: <CreatePost />,
    loader: protectedLoader,
  },
  {
    path: "/post/:postID",
    element: <PostDetail />,
    loader: protectedLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
