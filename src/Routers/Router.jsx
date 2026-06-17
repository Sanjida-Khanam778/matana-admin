import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Home from "../Pages/Home/Home";
import AllCategories from "../components/AllCategories/AllCategories";
import MainLayout from "../Layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>404</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "all-categories",
        element: <AllCategories />,
      },
      {
        path: "/about",
        element: <h1>Home</h1>,
      },
    ],
  },
  {
    path: "/login",
    element: <h1>Login</h1>,
  },
  {
    path: "/register",
    element: <h1>Register</h1>,
  },
]);
