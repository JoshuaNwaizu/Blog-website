import SignInForm from "./components/SignInForm";

const SignIn = () => {
  return (
    <div className="flex flex-row items-center justify-evenly text-black">
      <div className="flex flex-col gap-4">
        <h1 className="text-[2rem] font-bold">Sign in</h1>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
