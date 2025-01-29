import { FiEdit, FiEye, FiEyeOff, FiTrash } from "react-icons/fi";
import { useSubmit, Link, Form } from "react-router-dom";
import { Modal } from "../common/Modal";

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
      <Modal
        label={
          <div className="cursor-pointer rounded-md p-2 bg-red-500 hover:bg-red-400 text-white">
            <FiTrash />
          </div>
        }
        content={({ setOpen }) => (
          <div className="flex justify-center flex-col gap-5">
            <p className="text-lg">Do you really want to delete the recipe?</p>
            <div className="flex justify-between">
              <button
                id="deleteRecipe"
                type="submit"
                className="rounded-md p-2 bg-slate-500 hover:bg-slate-400 text-white"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <Form action={`/recipe/${recipe._id}`} method="DELETE">
                <button
                  id="deleteRecipe"
                  type="submit"
                  className="rounded-md p-2 bg-red-500 hover:bg-red-400 text-white"
                >
                  Delete
                </button>
              </Form>
            </div>
          </div>
        )}
      />
      <button
        title={recipe.public ? "Public" : "Private"}
        className="rounded-md p-2 bg-slate-500 hover:bg-slate-400 text-white"
        onClick={togglePublishRecipe}
      >
        {recipe.public ? <FiEye /> : <FiEyeOff />}
      </button>
      <Link
        to={`/dashboard/edit/${recipe.slug}`}
        className="p-2 rounded-md bg-slate-500 text-white hover:bg-slate-400"
      >
        <FiEdit />
      </Link>
    </div>
  );
};
