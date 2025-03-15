import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router";
import { API } from "../../../pages/main-page/Home";

const headerItems: string[] = ["home", "about", "contact"];
const AdminHeader = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API}/logout`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/home");
      } else {
        console.error("Failed to add post", data.message);
      }
      console.log(data);
    } catch (error: unknown) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div>
      <header className="flex items-center justify-between py-4">
        <span className="text-2xl font-extrabold no-underline hover:underline">
          Admin Panel
        </span>
        <nav className="flex justify-center gap-4">
          {headerItems.map((item) => (
            <Link to={`/${item}`}>
              <p
                key={item}
                className="p-[10px] capitalize hover:underline active:text-red-300"
              >
                {item}
              </p>
            </Link>
          ))}
        </nav>
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-2xl bg-[#000] px-[2rem] py-[1rem] text-white transition-all duration-150 hover:border-[1px] hover:border-black hover:bg-transparent hover:text-black"
          >
            <span>Logout</span>
            <BiLogOut />
          </button>
        </div>
      </header>
    </div>
  );
};

export default AdminHeader;
