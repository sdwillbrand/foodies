import { RecipeCard } from "../components/RecipeCard";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const Home = () => {
  const result = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");

  const nextPage = () =>
    setSearchParams({
      page: page
        ? Math.min(Number(page) + 1, Math.floor(result.total / 10))
        : 2,
    });

  const prevPage = () =>
    setSearchParams({ page: page ? Math.max(Number(page) - 1, 1) : 1 });

  return (
    <main className="relative grid grid-cols-1 mx-10 py-20 lg:mx-56 md:grid-cols-2 lg:grid-cols-3">
      {result.recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
      <div className="col-span-1 lg:col-span-3 justify-self-center flex items-center gap-2">
        <button onClick={prevPage}>
          <FiChevronLeft size={30} />
        </button>
        <span>
          {page ?? 1} of {result.total / 10}
        </span>
        <button onClick={nextPage}>
          <FiChevronRight size={30} />
        </button>
      </div>
    </main>
  );
};
