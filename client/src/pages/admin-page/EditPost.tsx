import { Link, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { className } from "./Dashboard";

import { BiArrowBack } from "react-icons/bi";
import React from "react";
import { API } from "../main-page/Home";

const EditPost = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("Params ID:", id);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    console.log("title:", title);
    console.log("body:", body);
    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/edit-post/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body }),
      });
      const data = await response.json();
      if (data) {
        setIsLoading(false);
        navigate("/admin/dashboard");
      } else {
        console.error("Failed to add post");
      }
      console.log(data);
    } catch (error: unknown) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
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
  return (
    <div className="flex flex-col gap-5">
      <Link to={"/admin/dashboard"} className="w-[3rem]">
        <BiArrowBack className="text-4xl font-bold" />
      </Link>
      <div className="mt-7 flex list-none flex-col gap-6 p-0">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">View / Edit Post</h1>
          <button
            className={`${className} ${isDeleting ? "bg-gray-500" : "bg-red-500"} `}
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting" : "Delete"}
          </button>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            {" "}
            <label htmlFor="title" className="text-xl font-bold">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="Post title"
              className="border-2 border-gray-400 bg-transparent px-4 py-2 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="body" className="text-xl font-bold">
              Content
            </label>
            <textarea
              name="body"
              placeholder="Post content"
              id="body"
              rows={10}
              cols={30}
              className="border-2 border-gray-400 bg-transparent px-4 py-2 outline-none"
            ></textarea>
          </div>

          <input
            type="submit"
            value={`${isLoading ? "Updating..." : "Update"}`}
            className={`${className} bg-[#000] ${isLoading && "bg-gray-500"}`}
          />
        </form>
      </div>
    </div>
  );
};

export default EditPost;
