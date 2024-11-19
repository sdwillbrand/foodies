import { useEffect, useState } from "react";
import { getRecipes } from "../services/recipe";
import { RecipeCard } from "../components/RecipeCard";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  return (
    <main className="grid grid-cols-1 mx-10 lg:mx-56 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </main>
  );
};
