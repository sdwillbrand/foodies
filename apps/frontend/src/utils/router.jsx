import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Recipe } from "../pages/Recipe";
import { EditRecipe } from "../pages/EditRecipe";
import { Layout } from "../components/layouts/Layout";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { CreateRecipe } from "../pages/CreateRecipe";
import { getRecipe, getRecipes, updateRecipe } from "../services/recipe";

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
        loader: async ({ params }) => {
          const recipe = await getRecipe(params.slug);
          return recipe;
        },
        action: async ({ request }) => {
          const formData = await request.formData();
          const action = formData.get("action");
          if (action === "PUBLISH" && request.method === "PUT") {
            await updateRecipe(formData.get("recipeId"), {
              public: formData.get("public"),
            });
            return { ok: true };
          }
        },
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
    path: "/dashboard/:userId",
    element: <DashboardLayout />,
    errorElement: <Navigate to="/" />,
    children: [
      {
        loader: async ({ params }) => {
          const recipes = await getRecipes({ userId: params.userId });
          return recipes;
        },
        index: true,
        element: <Dashboard />,
      },
      {
        path: "new",
        element: <CreateRecipe />,
      },
      {
        path: "edit/:slug",
        element: <EditRecipe />,
        loader: async ({ params }) => {
          const slug = params.slug;
          const recipe = await getRecipe(slug);
          return recipe;
        },
      },
    ],
  },
]);
