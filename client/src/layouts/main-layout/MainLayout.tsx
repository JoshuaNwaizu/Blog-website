import { Outlet } from "react-router";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Search from "./components/Search";

const MainLayout = () => {
  return (
    <div className="mx-auto my-0 max-w-[982px] px-2.5 py-0">
      <Search />
      <Header />
      <main className="px-0 py-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
