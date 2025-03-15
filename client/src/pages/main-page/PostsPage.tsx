import { useEffect, useState } from "react";
import { API, Post } from "./Home";
import { useParams } from "react-router";

const PostsPage = () => {
  const [postData, setPostData] = useState<Post | null>(null);
  const { id } = useParams<{ id: string }>();
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API}/post/${id}`);
      const data = await response.json();

      if (data.posts) {
        console.log("Hello world");
        console.log(data);
        console.log("this is a post data", data.posts);
        setPostData(data.posts);
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

  if (!postData) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-5 px-0 py-2.5 text-center">
      <div
        key={postData?._id}
        className="flex flex-col gap-5 px-0 py-2.5 text-center"
      >
        <h1 className="text-[2rem] font-bold">{postData?.title}</h1>
        <article className="text-[1.2rem]">{postData?.body}</article>
      </div>
    </div>
  );
};

export default PostsPage;
