import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { RecipeHeader } from "../components/recipe/RecipeHeader";
import { AuthContext } from "../contexts/AuthContext";
import { ScrollToTop } from "../components/common/ScrollToTop";

export const Recipe = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const recipe = useLoaderData();
  return (
    <main className="flex flex-col lg:mx-[20rem] pt-24 mx-10">
      {isAuthenticated && <RecipeHeader recipe={recipe} />}
      <h1 className="text-5xl font-semibold from-transparent to-current transition-opacity self-center">
        {recipe.title}
      </h1>
      <section className="flex flex-col md:flex-row mt-16 gap-5">
        {recipe.bannerImage && (
          <div className="relative max-w-[675px] max-h-[500px] overflow-hidden rounded-md -z-10">
            <img
              className="w-full h-full object-cover"
              src={recipe.bannerImage}
              alt="Recipe Banner"
            />
          </div>
        )}
        <p className="mt-5">{recipe.description}</p>
      </section>
      <section className="my-5">
        <h2 className="text-3xl font-bold">Zutaten</h2>
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
        <h2 className="text-3xl font-bold">Zubereitung</h2>
        <ol className="mt-2 flex flex-col gap-5">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="text-2xl">
              {index + 1}. {instruction.description}
            </li>
          ))}
        </ol>
      </section>
      <ScrollToTop />
    </main>
  );
};
