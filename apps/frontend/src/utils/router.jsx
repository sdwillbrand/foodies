import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Recipe } from "../pages/Recipe";
import { Layout } from "../components/layouts/Layout";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { CreateRecipe } from "../pages/CreateRecipe";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        path: "recipe/:slug",
        element: <Recipe />,
        errorElement: <Navigate to="/" />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <Navigate to="/" />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "new",
        element: <CreateRecipe />,
      },
      {
        path: ":id",
      },
    ],
  },
]);
