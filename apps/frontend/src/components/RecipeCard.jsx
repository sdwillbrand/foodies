import { Link } from "react-router-dom";
import { Badge } from "./common/Badge";

export const RecipeCard = ({ recipe }) => {
  return (
    <Link
      to={`/recipe/${recipe.slug}`}
      className="m-5 border rounded-lg hover:cursor-pointer hover:border-primary group"
      preventScrollReset={true}
    >
      {recipe.bannerImage && (
        <div className="relative w-full max-h-[150px] overflow-hidden flex items-center justify-center rounded-t-md -z-10">
          <img
            className="w-full object-cover bg-center group-hover:scale-110 transition-transform duration-500"
            src={recipe.bannerImage}
          />
        </div>
      )}
      <div className="p-5">
        <h1 className="text-3xl pb-5">{recipe.title}</h1>
        <p className="text-slate-500 line-clamp-2">{recipe.description}</p>
      </div>
      <div className="flex p-2">
        {recipe.tags.map((tag) => (
          <Badge key={tag}>{tag.name}</Badge>
        ))}
      </div>
    </Link>
  );
};
