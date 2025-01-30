import { useLoaderData, useNavigate } from "react-router-dom";
import { RecipeForm } from "../components/recipe/RecipeForm";

export const EditRecipe = () => {
  const initialRecipe = useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = async (recipe) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/recipes/${recipe._id}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(recipe),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        navigate("/dashboard");
      } else {
        const error = await response.json();
        console.error("Failed to save recipe: " + error.message);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the recipe.");
    }
  };

  return (
    <main className="flex justify-center pt-24 mb-5 mx-5">
      <RecipeForm recipe={initialRecipe} onSubmit={handleSubmit} />
    </main>
  );
};
