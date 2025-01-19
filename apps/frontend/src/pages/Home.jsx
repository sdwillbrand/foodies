import { RecipeCard } from "../components/RecipeCard";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import classNames from "classnames";
import { Suspense } from "react";

export const Home = () => {
  const result = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("p")) || 1;

  const nextPage = (total) => () =>
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev.entries());
      return {
        ...params,
        p: Math.min(Number(page) + 1, Math.floor(total / 10) || 1),
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
    <main className="grid grid-cols-1 mx-10 py-20 lg:mx-56 md:grid-cols-2 lg:grid-cols-3">
      <h1 className="col-span-full text-3xl mt-5">Discover new recipes</h1>
      <Suspense fallback={<p>Loading recipes...</p>}>
        <Await
          resolve={result.data}
          errorElement={<p>Error loading recipes</p>}
        >
          {({ recipes, total }) => (
            <>
              {recipes.length === 0 && (
                <p>Hm... Could not find any recipes...</p>
              )}
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}

              <div className="fixed bottom-0 bg-white w-full col-span-1 lg:col-span-3 justify-self-center justify-center flex gap-10 md:gap-2 p-10 sm:p-5 border-t">
                <button
                  onClick={prevPage}
                  className={classNames(
                    "border-r w-full flex justify-center items-center",
                    { "opacity-30 cursor-not-allowed": page === 1 }
                  )}
                >
                  <FiChevronLeft size={30} />
                </button>
                <p className="min-w-16 flex justify-center">
                  {page} of {Math.floor(total / 10) || 1}
                </p>
                <button
                  onClick={nextPage(total)}
                  className={classNames(
                    "border-l w-full flex justify-center items-center",
                    {
                      "opacity-30 cursor-not-allowed":
                        page === Math.floor(total / 10),
                    }
                  )}
                >
                  <FiChevronRight size={30} />
                </button>
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </main>
  );
};
