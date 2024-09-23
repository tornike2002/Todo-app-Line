// import { Link } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
import LoginPic from "../../assets/login-pic.png";
const SignInPage = () => {
  return (
    <section className="flex items-center justify-center h-screen xl:justify-around">
      <img src={LoginPic} alt="icons" className="cursor-text hidden xl:block" />
      <SignIn />
    </section>
  );
};

export default SignInPage;
