import { useSearchParams } from "react-router-dom";

export const Searchbar = () => {
  const [searchParams] = useSearchParams();

  return (
    <form action="/">
      <input
        className="p-2 rounded-xl"
        name="q"
        placeholder="Search..."
        defaultValue={searchParams.get("q")}
      />
    </form>
  );
};
