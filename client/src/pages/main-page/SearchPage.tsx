import { useEffect, useState } from "react";
import { API, formatDate, Post } from "./Home";
import { Link, useLocation } from "react-router";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm || typeof searchTerm !== "string") {
        setError("Please enter a valid search term.");
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API}/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: searchTerm }),
        });
        if (!response.ok)
          throw new Error(
            `Failed to search. Response error ${response.status}`,
          );
        const data = await response.json();
        if (data.posts) {
          setSearchResults(data.posts);
          console.log(data.posts);
        }
      } catch (error: unknown) {
        console.error(error);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSearchResults();
  }, [searchTerm]);

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      <div>
        <h1 className="pb-5 text-center text-[2.2rem] font-bold md:text-[3rem]">
          Search results for: '{searchTerm}'
        </h1>
        <div>
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((post: Post) => (
              <div key={post._id} className="py-1 text-[1.2rem]">
                <p className="flex justify-between text-[1rem] md:text-[1.2rem]">
                  <Link to={`/post/${post._id}`}>
                    <span className="hover:underline">{post.title}</span>
                  </Link>
                  <span className="inline-block text-gray-500 max-sm:hidden">
                    {formatDate(post.createdAt)}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p>No search results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
