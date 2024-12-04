import { RecipeCard } from "../components/RecipeCard";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const Home = () => {
  const result = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("p")) || 1;

  const nextPage = () =>
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev.entries());
      return {
        ...params,
        p: Math.min(Number(page) + 1, Math.floor(result.total / 10) || 1),
      };
    });

  const prevPage = () =>
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev.entries());
      return {
        ...params,
        p: Math.max(Number(page) - 1, 1),
      };
    });

  return (
    <main className="relative grid grid-cols-1 mx-10 py-20 lg:mx-56 md:grid-cols-2 lg:grid-cols-3">
      {result.recipes.length === 0 && (
        <p>Hm... Could not find any recipes...</p>
      )}
      {result.recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
      <div className="col-span-1 lg:col-span-3 justify-self-center flex items-center gap-2">
        <button onClick={prevPage}>
          <FiChevronLeft size={30} />
        </button>
        <span>
          {page} of {Math.floor(result.total / 10) || 1}
        </span>
        <button onClick={nextPage}>
          <FiChevronRight size={30} />
        </button>
      </div>
    </main>
  );
};
