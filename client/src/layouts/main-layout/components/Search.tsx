import { useState } from "react";
import { API } from "../../../pages/main-page/Home";
import { useNavigate } from "react-router";

const Search = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTerm || typeof searchTerm !== "string") {
      return;
    }
    navigate(`/search?search=${searchTerm}`);

    try {
      const response = await fetch(`${API}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: searchTerm }),
      });
      if (!response.ok)
        throw new Error(`Failed to search. Response error ${response.status}`);

      await response.json();
    } catch (error: unknown) {
      console.error(error);
    }
  };
  const handleTogggleSearch = () => {
    setOpenSearch(!openSearch);
  };
  return (
    <div
      className={`relative ${openSearch ? "translate-y-0" : "translate-y-[-100px]"} bg-black px-0 py-[2.5rem] transition-all duration-200`}
    >
      <div>
        <form
          action="search"
          role="search"
          name="search"
          method="POST"
          className="mx-[4rem] py-3"
          onSubmit={handleSearch}
        >
          <input
            type="search"
            aria-label="search"
            name="searchTerm"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search the site..."
            className="rounded-4xl border-none bg-white px-[1rem] py-2 outline-none"
          />
        </form>
      </div>
      <span
        className="absolute bottom-2 right-3 cursor-pointer text-white"
        onClick={handleTogggleSearch}
      >
        {openSearch ? "Close" : "Open"} Search
      </span>
    </div>
  );
};

export default Search;
