// import { Link } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
const SignInPage = () => {
  return (
    <section className="flex items-center justify-center h-screen">
      <SignIn   />
    </section>

    // <section className="mx-4 mt-[72px]  flex items-center justify-center overflow-y-hidden">
    //   <SignInButton />
    //   <div className="w-[343px] max-w-full">
    //     <div className="flex flex-col items-center justify-center gap-8">
    //       {/* <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="79"
    //         height="79"
    //         viewBox="0 0 79 79"
    //         fill="none"
    //       >
    //         <circle
    //           cx="39.5"
    //           cy="39.5"
    //           r="39.5"
    //           fill="#0500FF"
    //           fillOpacity="0.45"
    //         />
    //       </svg> */}
    //       <UserButton />
    //       <h1 className="text-light-blue text-[32px] font-medium font-roboto">
    //         Sign in
    //       </h1>
    //     </div>
    //     {/* form */}
    //     <form>
    //       {/* inputs */}
    //       <div className="flex flex-col gap-2 pt-12">
    //         <input
    //           type="text"
    //           className="w-full py-5 px-4 text-auth-placeholder font-roboto leading-normal outline-none border
    //            border-[#E6E8EB] rounded-xl"
    //           placeholder="Enter your username or Email"
    //         />
    //         <input
    //           type="password"
    //           className="w-full py-5 px-4 text-auth-placeholder font-roboto leading-normal outline-none border
    //            border-[#E6E8EB] rounded-xl"
    //           placeholder="Enter your password"
    //         />
    //       </div>
    //       {/* forgot password */}
    //       <button className="text-main-blue font-roboto text-xs leading-normal mt-[14px]">
    //         Forgot password?
    //       </button>
    //       {/* sign in buttons  */}
    //       <div className="flex flex-col items-center justify-center gap-8 mt-6">
    //         <button
    //           className="rounded-[30px] w-full py-[10px] bg-[#477EE7] font-roboto
    //          text-white font-medium leading-normal"
    //         >
    //           Sign in
    //         </button>
    //         <div className="flex items-center justify-between w-full">
    //           <div className="bg-[#CFD3DA] w-[125px] max-w-full h-[1px]"></div>
    //           <h1 className="text-main-blue font-roboto text-sm">Or</h1>
    //           <div className="bg-[#CFD3DA] w-[125px] max-w-full h-[1px]"></div>
    //         </div>
    //         <button
    //           className="rounded-[30px] w-full py-[10px]  font-roboto
    //          text-main-blue font-medium leading-normal text-sm flex items-center justify-center gap-4
    //          border border-[#CFD3D9]"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="23"
    //             height="22"
    //             viewBox="0 0 23 22"
    //             fill="none"
    //           >
    //             <path
    //               d="M20.4884 9.20475H19.75V9.16671H11.5V12.8334H16.6805C15.9247 14.9678 13.8939 16.5 11.5 16.5C8.4626 16.5 5.99998 14.0374 5.99998 11C5.99998 7.96267 8.4626 5.50004 11.5 5.50004C12.902 5.50004 14.1776 6.02896 15.1488 6.89292L17.7416 4.30012C16.1044 2.77433 13.9145 1.83337 11.5 1.83337C6.43769 1.83337 2.33331 5.93775 2.33331 11C2.33331 16.0623 6.43769 20.1667 11.5 20.1667C16.5623 20.1667 20.6666 16.0623 20.6666 11C20.6666 10.3854 20.6034 9.78546 20.4884 9.20475Z"
    //               fill="#FFC107"
    //             />
    //             <path
    //               d="M3.39026 6.73342L6.40197 8.94212C7.21688 6.92454 9.19047 5.50004 11.5 5.50004C12.9021 5.50004 14.1776 6.02896 15.1488 6.89292L17.7416 4.30012C16.1044 2.77433 13.9145 1.83337 11.5 1.83337C7.97909 1.83337 4.92568 3.82117 3.39026 6.73342Z"
    //               fill="#FF3D00"
    //             />
    //             <path
    //               d="M11.5 20.1666C13.8677 20.1666 16.0191 19.2605 17.6458 17.7869L14.8087 15.3862C13.8576 16.1099 12.6951 16.5012 11.5 16.4999C9.11573 16.4999 7.09127 14.9797 6.32861 12.858L3.33936 15.1612C4.85644 18.1298 7.93736 20.1666 11.5 20.1666Z"
    //               fill="#4CAF50"
    //             />
    //             <path
    //               d="M20.4884 9.20467H19.75V9.16663H11.5V12.8333H16.6805C16.319 13.8491 15.6678 14.7368 14.8073 15.3867L14.8087 15.3858L17.6458 17.7865C17.445 17.9689 20.6667 15.5833 20.6667 11C20.6667 10.3853 20.6034 9.78538 20.4884 9.20467Z"
    //               fill="#1976D2"
    //             />
    //           </svg>
    //           Sign in with google
    //         </button>

    //         <p className="text-main-blue text-sm font-roboto leading-normal">
    //           Don't have account?
    //           <Link className="underline font-medium" to="/signUp">
    //             Sign up
    //           </Link>
    //         </p>
    //       </div>
    //     </form>
    //   </div>
    // </section>
  );
};

export default SignInPage;
