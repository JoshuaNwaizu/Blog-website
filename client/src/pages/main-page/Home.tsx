import { useEffect, useState } from "react";
import { Link } from "react-router";
export interface Post {
  _id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export const API = "http://localhost:5000";
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
  const [isNextPage, setIsNextPage] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response: Response = await fetch(`${API}/post`);
      const data = await response.json();
      if (data.nextPage) {
        console.log("next Page", data.nextPage);
        setIsNextPage(data.nextPage);
      } else {
        console.log("no page");
      }
      if (data.posts) {
        console.log("Hello world");
        console.log(data);
        setData(data.posts);
        setIsLoading(false);
      } else {
        console.log("no data");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  console.log(data);

  return (
    <div>
      <div className="flex flex-col gap-5 px-0 py-2.5 text-center">
        <h1 className="text-[3rem] font-bold">Hi, I am Joshua</h1>
        <p>I'm a Web developer and Mobile developer.</p>
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
          {isLoading && <p className="text-[1.2rem] text-black">Loading...</p>}
          {data.map((post) => (
            <li className="flex justify-between text-[1.2rem]">
              <Link to={`/post/${post._id}`}>
                <span className="hover:underline">{post.title}</span>
              </Link>
              <span className="inline-block text-gray-500">
                {formatDate(post.createdAt)}
              </span>
            </li>
          ))}
        </ul>
        {isNextPage && (
          <p className="my-[40px] inline-block cursor-pointer text-[1.3rem] text-gray-500 transition-colors duration-150 hover:text-black">
            &lt; View older posts
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
