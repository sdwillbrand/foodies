import { Link } from "react-router-dom";

export const RecipeCard = ({ recipe }) => {
  return (
    <Link
      to={`/recipe/${recipe.slug}`}
      className="m-5 border rounded-lg p-5 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-xl transition-all hover:cursor-pointer hover:border-primary"
    >
      <h1 className="text-3xl pb-5">{recipe.title}</h1>
      <p className="text-slate-500 line-clamp-2">{recipe.description}</p>
    </Link>
  );
};
