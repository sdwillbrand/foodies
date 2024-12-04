import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import { Home } from "../pages/Home";
import { Recipe } from "../pages/Recipe";
import { EditRecipe } from "../pages/EditRecipe";
import { Layout } from "../components/layouts/Layout";
import { DashboardLayout } from "../components/layouts/DashboardLayout";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { CreateRecipe } from "../pages/CreateRecipe";
import {
  getRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
} from "../services/recipe";

export const setupRouter = ({ logout }) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          loader: async ({ request }) => {
            const url = new URL(request.url);
            const p = url.searchParams.get("p");
            const q = url.searchParams.get("q");
            const result = await getRecipes({ p, q });
            return result;
          },
          element: <Home />,
          index: true,
        },
        {
          path: "recipe/:slug",
          loader: async ({ params }) => {
            const recipe = await getRecipe(params.slug);
            return recipe;
          },
          action: async ({ params, request }) => {
            const formData = await request.formData();
            const action = formData.get("action");
            if (action === "PUBLISH" && request.method === "PUT") {
              await updateRecipe(formData.get("recipeId"), {
                public: formData.get("public"),
              });
            } else if (request.method === "DELETE") {
              await deleteRecipe(params.slug);
              return redirect("/");
            }
            return { ok: true };
          },
          element: <Recipe />,
          errorElement: <Navigate to="/" />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "logout",
          action: async () => {
            await logout();
            return redirect("/");
          },
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
