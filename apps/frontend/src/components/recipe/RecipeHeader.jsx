import { FiEye, FiEyeOff } from "react-icons/fi";
import { updateRecipe } from "../../services/recipe";

export const RecipeHeader = ({ recipe }) => {
  const togglePublishRecipe = () => {
    updateRecipe(recipe._id, { public: !recipe.public }).then((result) => {
      Object.assign(recipe, result);
    });
  };

  return (
    <div className="sticky top-0 flex flex-row justify-end m-2">
      <button
        title={recipe.public ? "Veröffentlichen" : "Verheimlichen"}
        className="rounded-md p-2 bg-slate-500 hover:bg-slate-400 text-white"
        onClick={togglePublishRecipe}
      >
        {recipe.public ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
};
