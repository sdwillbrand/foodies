import { useContext } from "react";
import { RecipeCard } from "../components/RecipeCard";
import { AuthContext } from "../contexts/AuthContext";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <main className="grid grid-cols-1 mx-10 lg:mx-56 lg:grid-cols-3">
      {user.recipes && user.recipes.length === 0 && (
        <p className="m-10">Create your first recipe!</p>
      )}
      {user.recipes &&
        user.recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
    </main>
  );
};
