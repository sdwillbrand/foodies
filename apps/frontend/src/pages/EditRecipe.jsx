import { useLoaderData } from "react-router-dom";
import { RecipeForm } from "../components/recipe/RecipeForm";
import { useState } from "react";

export const EditRecipe = () => {
  const initialRecipe = useLoaderData();

  const [recipe, setRecipe] = useState(initialRecipe);

  const handleChange = (file) => {
    setRecipe((prev) => ({ ...prev, bannerImage: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", recipe.title);
    formData.append("description", recipe.description);
    formData.append("bannerImage", recipe.bannerImage);
    formData.append("ingredients", JSON.stringify(recipe.ingredients));
    formData.append("instructions", JSON.stringify(recipe.instructions));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/recipes/${recipe._id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      if (response.ok) {
        // navigate("/dashboard");
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
    <main className="flex justify-center my-10 mx-5">
      <RecipeForm
        recipe={recipe}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </main>
  );
};
