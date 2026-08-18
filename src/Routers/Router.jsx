import { createBrowserRouter } from "react-router-dom";
import CommunityDetails from "../Detailpage/CommunityDetails";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import AllCategories from "../components/AllCategories/AllCategories";
import AllEvents from "../components/AllEvents/AllEvents";
import AllCommunities from "../components/Browsebycommunity/AllCommunities";
import AllCommunity from "../components/Browsebycommunity/AllCommunityStores";
import Pricing from "../components/Businessdirectoryform/Businessdirectoryform";

import BusinessDashboard from "../Pages/BusinessDashboard/BusinessDashboard";
import BusinessLogin from "../Pages/BusinessLogin/BusinessLogin";

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
        path: "all-stores",
        element: <AllCategories showAllStores={true} />,
      },
      {
        path: "all-events",
        element: <AllEvents />,
      },
      {
        path: "category-details/:id?",
        element: <CommunityDetails />,
      },
      {
        path: "all-community",
        element: <AllCommunities />,
      },
      {
        path: "all-community-stores",
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
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/business-login",
        element: <BusinessLogin />,
      },
      {
        path: "/business-dashboard",
        element: <BusinessDashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <BusinessLogin />,
  },
  {
    path: "/register",
    element: <h1>Register</h1>,
  },
]);
