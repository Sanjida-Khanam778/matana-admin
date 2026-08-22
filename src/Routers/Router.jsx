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
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../Pages/TermsOfService/TermsOfService";

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
        element: <Home />,
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
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsOfService />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfService />,
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
