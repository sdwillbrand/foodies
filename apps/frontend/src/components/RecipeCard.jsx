import { Link } from "react-router-dom";

export const RecipeCard = ({ recipe }) => {
  return (
    <Link
      to={`/recipe/${recipe.slug}`}
      className="m-5 border rounded-lg hover:cursor-pointer hover:border-primary group"
    >
      {recipe.bannerImage && (
        <div className="relative w-full max-h-[150px] overflow-hidden flex items-center justify-center rounded-t-md -z-10">
          <img
            className="w-full object-cover bg-center group-hover:scale-110 transition-transform duration-500"
            src={`${import.meta.env.VITE_API_URL}/${recipe.bannerImage}`}
          />
        </div>
      )}
      <div className="p-5">
        <h1 className="text-3xl pb-5">{recipe.title}</h1>
        <p className="text-slate-500 line-clamp-2">{recipe.description}</p>
      </div>
    </Link>
  );
};
