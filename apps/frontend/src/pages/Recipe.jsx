import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { RecipeHeader } from "../components/recipe/RecipeHeader";
import { AuthContext } from "../contexts/AuthContext";

export const Recipe = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const recipe = useLoaderData();
  return (
    <>
      {isAuthenticated && <RecipeHeader recipe={recipe} />}
      <main className="flex flex-col lg:mx-40 mt-10 mx-10">
        <h1 className="text-5xl font-semibold from-transparent to-current transition-opacity self-center">
          {recipe.title}
        </h1>
        <section className="flex flex-row mt-16 gap-5">
          {recipe.bannerImage && (
            <div className="relative max-w-[675px] max-h-[500px] overflow-hidden rounded-md">
              <img
                className="w-full h-full object-cover"
                src={`${import.meta.env.VITE_API_URL}/${recipe.bannerImage}`}
                alt="Recipe Banner"
              />
            </div>
          )}
          <p className="mt-5">{recipe.description}</p>
        </section>
        <section className="my-5">
          <h2 className="text-2xl font-bold">Zutaten</h2>
          <ol className="mt-2 flex flex-col gap-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <span className="font-semibold">
                  {ingredient.quantity}
                  {ingredient.unit}
                </span>{" "}
                {ingredient.name}
              </li>
            ))}
          </ol>
        </section>
        <section className="my-5">
          <h2 className="text-2xl font-bold">Zubereitung</h2>
          <ol className="mt-2 flex flex-col gap-2">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>
                {index + 1}. {instruction.description}
              </li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
};
