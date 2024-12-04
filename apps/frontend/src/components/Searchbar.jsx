import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

export const Searchbar = () => {
  const [searchParams] = useSearchParams();

  return (
    <form action="/">
      <div className="bg-white flex items-center space-x-2 pr-2 rounded-xl">
        <input
          className="flex-grow rounded-xl focus:outline-none p-2"
          name="q"
          placeholder="Search..."
          defaultValue={searchParams.get("q")}
        />
        <FiSearch className="text-gray-500" />
      </div>
    </form>
  );
};
