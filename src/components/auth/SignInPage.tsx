// import { Link } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
const SignInPage = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <SignIn   />
    </section>
  );
};

export default SignInPage;
