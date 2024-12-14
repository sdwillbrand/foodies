import { useNavigate } from "react-router-dom";
import { RecipeForm } from "../components/recipe/RecipeForm";

export const CreateRecipe = () => {
  const navigate = useNavigate();

  const handleSubmit = async (recipe) => {
    const formData = new FormData();

    formData.append("title", recipe.title);
    formData.append("description", recipe.description);
    formData.append("bannerImage", recipe.bannerImage);
    formData.append("ingredients", JSON.stringify(recipe.ingredients));
    formData.append("instructions", JSON.stringify(recipe.instructions));
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/recipes`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        navigate(`/dashboard`);
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
      <RecipeForm
        recipe={{
          title: "",
          description: "",
          bannerImage: null, // For storing the file itself,
          ingredients: [],
          instructions: [],
        }}
        onSubmit={handleSubmit}
      />
    </main>
  );
};
