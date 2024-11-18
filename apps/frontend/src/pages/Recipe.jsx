import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipe } from "../services/recipe";
import { LoadingSkeleton } from "../components/LoadingSkeleton";

export const Recipe = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getRecipe(slug)
      .then(setRecipe)
      .catch(() => navigate("/"))
      .finally(() => {
        setTimeout(() => setLoading(false), 200);
      });
  }, [slug, navigate]);

  return (
    <main className="flex flex-col lg:mx-40 mt-10 mx-10">
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <h1 className="text-5xl font-semibold from-transparent to-current transition-opacity self-center">
          {recipe.title}
        </h1>
      )}
      <section className="flex flex-row mt-16">
        {!loading && recipe.bannerImage && (
          <div className="relative max-w-[675px] max-h-[500px] overflow-hidden rounded-md">
            <img
              className="w-full h-full object-cover"
              src={`${import.meta.env.VITE_API_URL}/${recipe.bannerImage}`}
              alt="Recipe Banner"
            />
          </div>
        )}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <p className="mt-5">{recipe.description}</p>
        )}
      </section>
      <section className="my-5">
        <h2 className="text-2xl font-bold">Zutaten</h2>
        {loading ? (
          <LoadingSkeleton className="mt-2" />
        ) : (
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
        )}
      </section>
      <section className="my-5">
        <h2 className="text-2xl font-bold">Zubereitung</h2>
        {loading ? (
          <LoadingSkeleton className="mt-2" />
        ) : (
          <ol className="mt-2 flex flex-col gap-2">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>
                {index + 1}. {instruction.description}
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
};
