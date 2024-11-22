import { FiEdit, FiEye, FiEyeOff, FiTrash } from "react-icons/fi";
import { useSubmit, Link, Form } from "react-router-dom";

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
    <div className="fixed top-0 right-0 flex flex-row mx-2 gap-2 pt-24">
      <Form action={`/recipe/${recipe._id}`} method="DELETE">
        <button
          type="submit"
          className="rounded-md p-2 bg-red-500 hover:bg-red-400 text-white"
        >
          <FiTrash />
        </button>
      </Form>
      <button
        title={recipe.public ? "Veröffentlichen" : "Verheimlichen"}
        className="rounded-md p-2 bg-slate-500 hover:bg-slate-400 text-white"
        onClick={togglePublishRecipe}
      >
        {recipe.public ? <FiEye /> : <FiEyeOff />}
      </button>
      <Link
        to={`/dashboard/${recipe.user}/edit/${recipe.slug}`}
        className="p-2 rounded-md bg-slate-500 text-white hover:bg-slate-400"
      >
        <FiEdit />
      </Link>
    </div>
  );
};
