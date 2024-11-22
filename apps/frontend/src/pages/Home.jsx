import { RecipeCard } from "../components/RecipeCard";
import { useLoaderData } from "react-router-dom";

export const Home = () => {
  const recipes = useLoaderData();

  return (
    <main className="grid grid-cols-1 mx-10 py-20 lg:mx-56 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </main>
  );
};
