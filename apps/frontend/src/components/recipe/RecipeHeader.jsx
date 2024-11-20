import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSubmit } from "react-router-dom";

export const RecipeHeader = ({ recipe }) => {
  const submit = useSubmit();
  const togglePublishRecipe = () => {
    const formData = new FormData();
    formData.append("recipeId", recipe._id);
    formData.append("public", !recipe.public);
    formData.append("action", "PUBLISH");
    submit(formData, {
      method: "PUT",
      action: `/recipe/${recipe.slug}`,
    });
  };

  return (
    <div className="sticky top-0 flex flex-row justify-end m-2">
      <button
        title={recipe.public ? "Veröffentlichen" : "Verheimlichen"}
        className="rounded-md p-2 bg-slate-500 hover:bg-slate-400 text-white"
        onClick={togglePublishRecipe}
      >
        {recipe.public ? <FiEye /> : <FiEyeOff />}
      </button>
    </div>
  );
};
