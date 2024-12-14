import { RecipeCard } from "../components/RecipeCard";
import { useLoaderData } from "react-router-dom";

export const Dashboard = () => {
  const recipes = useLoaderData();

  return (
    <main className="grid grid-cols-1 mx-10 lg:mx-56 lg:grid-cols-3 pt-20">
      <h1 className="col-span-full text-3xl font-semibold py-1">My recipes</h1>
      {recipes && recipes.length === 0 && (
        <p className="m-10">Create your first recipe!</p>
      )}
      {recipes &&
        recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
    </main>
  );
};
