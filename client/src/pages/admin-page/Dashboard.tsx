import { Link, useNavigate } from "react-router";
import { API, Post } from "../main-page/Home";
import { useEffect, useState } from "react";
import { CgLink } from "react-icons/cg";

interface Dashboard {
  message: string;
  posts: Post[];
}
export const className: string =
  "flex items-center gap-1.5 rounded-2xl  px-[1rem] py-[0.7rem] text-white transition-all duration-150  ";

const Dashboard = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);
  const navigate = useNavigate();

  const getDashboard = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API}/dashboard`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!data) {
        console.log("No data");
      }
      setDashboardData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      setDeletingPostId(id);
      setIsDeleting(true);
      const response = await fetch(`${API}/delete-post/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/admin/dashboard");
      } else {
        console.error("Failed to add post");
      }
      console.log(data);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("admin/sign-in");
    } else {
      getDashboard();
    }
  }, []);
  if (!dashboardData) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">Posts</h2>
        <Link to={"/admin/add-post"}>
          <button className="flex items-center gap-1.5 rounded-2xl bg-[#000] px-[2rem] py-[1rem] text-white transition-all duration-150 hover:border-[1px] hover:border-black hover:bg-transparent hover:text-black">
            Add new
          </button>
        </Link>
      </div>
      <ul className="mt-7 flex list-none flex-col gap-6 p-0">
        {dashboardData?.posts.map((post) => (
          <div key={post._id}>
            <li className="flex justify-between text-[1.2rem]">
              <Link to={`/post/${post._id}`}>
                <p className="flex gap-2 hover:underline">
                  <span>{post.title} </span>
                  <span>
                    <CgLink />
                  </span>
                </p>{" "}
              </Link>
              <div className="flex gap-2">
                <Link to={`/admin/edit-post/${post._id}`}>
                  <button className={`${className} bg-[#000]`}>Edit</button>
                </Link>
                <button
                  className={`${className} ${isDeleting && deletingPostId === post._id ? "bg-gray-500" : "bg-red-500"} `}
                  onClick={() => handleDelete(post._id)}
                >
                  {isDeleting && deletingPostId === post._id
                    ? "Deleting"
                    : "Delete"}
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
