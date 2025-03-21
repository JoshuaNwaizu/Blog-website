import { BiSearch } from "react-icons/bi";
import { Link } from "react-router";

const headerItems: string[] = ["home", "about", "contact"];
const Header = () => {
  return (
    <div>
      <header className="flex items-center justify-between py-4">
        <span className="text-2xl font-extrabold no-underline hover:underline">
          NoBlog
        </span>
        <nav className="flex justify-center gap-4">
          {headerItems.map((item, i) => (
            <Link to={`/${item === "home" ? "" : item}`} key={i}>
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
            aria-expanded="false"
            className="hidden items-center gap-1.5 rounded-2xl bg-[#000] px-[2rem] py-[1rem] text-white transition-all duration-150 hover:border-[1px] hover:border-black hover:bg-transparent hover:text-black"
          >
            <span>Search</span>
            <BiSearch />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
