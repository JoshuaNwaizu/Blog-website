import RegisterForm from "./components/RegisterForm";

const SignUp = () => {
  return (
    <div className="flex flex-row items-center justify-evenly text-black">
      {" "}
      <div className="flex flex-row items-center justify-evenly text-black">
        <div className="flex flex-col gap-4">
          <h1 className="text-[2rem] font-bold">Resigter</h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
