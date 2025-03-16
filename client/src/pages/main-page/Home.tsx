import { useEffect, useState } from "react";
import { Link } from "react-router";
export interface Post {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}
export interface IUser {
  _id: string;
  userName: string;
  // add other properties as needed
}

export const API = "http://localhost:5000/v1/api";
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const Home = () => {
  const [data, setData] = useState<Post[]>([]);
  const [user, setUser] = useState<IUser | null>(null);

  const [isNextPage, setIsNextPage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response: Response = await fetch(`${API}/post`);
      const data = await response.json();
      if (data.nextPage) {
        setIsNextPage(data.nextPage);
      }
      if (data.posts) {
        setData(data.posts);
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request
        },
      });
      const data = await response.json();

      if (data.users) {
        setUser(data.users);
      }
    } catch (error) {
      console.error("error fetching users", error);
    }
  };
  useEffect(() => {
    fetchPosts();
    getUsers();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 px-0 py-2.5 text-center">
        <h1 className="text-[3rem] font-bold">
          Hi, {user ? user.userName : "Friend"}
        </h1>
        {!user ? (
          <p className="flex justify-center gap-1">
            <Link to={"/admin/sign-up"} className="font-bold underline">
              Sign-up
            </Link>
            or
            <Link to={"/admin/sign-in"} className="font-bold underline">
              Login
            </Link>
            to create a blog post
          </p>
        ) : (
          <p className="flex items-center justify-center gap-1">
            <span>Create a blog post in</span>
            <Link to={"/admin/dashboard"} className="font-bold underline">
              Dashboard
            </Link>
          </p>
        )}
      </div>
      <img
        src="/man-male-window-portrait.jpg"
        width={981}
        height={528}
        alt="someone looking out of the window"
        className="max-h-[528px] overflow-hidden rounded-[18px] drop-shadow-[0px_44px_34px_rgba(0,0,0,0.25)]"
      />
      <section className="flex flex-col gap-5">
        <h2 className="mt-[4rem] text-[1.7rem] font-bold">Latest Posts</h2>
        <ul className="m-0 flex list-none flex-col gap-6 p-0">
          {isLoading && (
            <p className="text-2xl text-black md:text-[1.2rem]">Loading...</p>
          )}
          {data.map((post) => (
            <li className="flex justify-between text-[1rem] md:text-[1.2rem]">
              <Link to={`/post/${post._id}`}>
                <span className="hover:underline">{post.title}</span>
              </Link>
              <span className="inline-block text-gray-500 max-sm:hidden">
                {formatDate(post.createdAt)}
              </span>
            </li>
          ))}
        </ul>
        {isNextPage && (
          <p className="my-[40px] inline-flex justify-between text-[1.3rem] text-gray-500 transition-colors duration-150">
            <span className="cursor-pointer hover:text-black">
              {" "}
              &lt; View older posts
            </span>
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
