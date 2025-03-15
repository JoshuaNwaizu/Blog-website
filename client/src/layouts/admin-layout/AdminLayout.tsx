import AdminHeader from "./components/AdminHeader";
import { Outlet } from "react-router";
import Footer from "../main-layout/components/Footer";

const AdminLayout = () => {
  return (
    <div className="mx-auto my-0 max-w-[982px] px-2.5 py-0">
      <AdminHeader />
      <main className="px-0 py-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
