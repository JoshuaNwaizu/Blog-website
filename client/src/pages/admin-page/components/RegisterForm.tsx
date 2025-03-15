import { API } from "../../main-page/Home";

const RegisterForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userName = formData.get("username") as string;
    const password = formData.get("password") as string;
    try {
      const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Resonse from the server", data);
      } else {
        console.error("Failed to register form");
      }
    } catch (err) {
      console.error("error registering form", err);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-xl font-bold">
            Username:
          </label>
          <input
            type="username"
            id="username"
            name="username"
            placeholder="Enter username"
            required
            className="border-2 border-gray-400 bg-transparent px-4 py-2 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-xl font-bold">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className="border-2 border-gray-400 bg-transparent px-4 py-2 outline-none"
          />
        </div>

        <div>
          <input
            type="submit"
            value="Register"
            className="flex items-center gap-1.5 rounded-2xl bg-[#000] px-[2rem] py-[1rem] text-white transition-all duration-150 hover:border-[1px] hover:border-black hover:bg-transparent hover:text-black"
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
