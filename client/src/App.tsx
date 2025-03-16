import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/main-layout/MainLayout";
import Home from "./pages/main-page/Home";
import About from "./pages/main-page/About";
import Contact from "./pages/main-page/Contact";
import PostsPage from "./pages/main-page/PostsPage";
import AdminLayout from "./layouts/admin-layout/AdminLayout";
import SearchPage from "./pages/main-page/SearchPage";
import SignIn from "./pages/admin-page/SignIn";
import Dashboard from "./pages/admin-page/Dashboard";

import AddPost from "./pages/admin-page/AddPost";
import EditPost from "./pages/admin-page/EditPost";
import SignUp from "./pages/admin-page/SignUp";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/post/:id", element: <PostsPage /> },
      { path: "/search", element: <SearchPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "add-post", element: <AddPost /> },
      { path: "edit-post/:id", element: <EditPost /> },
    ],
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
