import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layouts/Dashboard";
import Home from "../Pages/Home/Home";
import AllCategories from "../components/AllCategories/AllCategories";
import MainLayout from "../Layouts/MainLayout";
import AllEvents from "../components/AllEvents/AllEvents";
import DetailPage from "../Detailpage/Detailpage";
import CommunityDetails from "../Detailpage/CommunityDetails";
import AllCommunity from "../components/Browsebycommunity/AllCommunity";

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
        path: "all-stores/:categoryName?",
        element: <AllCategories />,
      },
      {
        path: "all-events",
        element: <AllEvents />,
      },
      {
        path: "category-details",
        element: <DetailPage />,
      },
      {
        path: "all-community",
        element: <AllCommunity />,
      },
      {
        path: "community-details/:id",
        element: <CommunityDetails />,
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
