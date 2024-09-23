import { UserButton } from "@clerk/clerk-react";
import { Drawer } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useInputStore } from "../../stores/inputStore";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const { inputValue, setInputValue } = useInputStore();

  const showInputHandler = () => {
    setShowInput((val) => !val);
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handdleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <nav className="px-4 py-2 border-b border-b-[#C7CAD0]">
      <div className="flex items-center justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          className="cursor-pointer flex-shrink-0"
          onClick={showDrawer}
        >
          <path
            d="M0 0H18V2H0V0ZM0 7H12V9H0V7ZM0 14H18V16H0V14Z"
            fill="#252931"
          />
        </svg>
        <div className="flex items-center gap-3">
          {showInput && (
            <input
              type="search"
              className="font-inter text-sm max-w-[145px] shadow-custom-shadow border
             border-black rounded-md outline-none pl-2"
              onChange={handdleInputValue}
              value={inputValue}
            />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16.993"
            height="16.13"
            viewBox="0 0 18 18"
            fill="none"
            className="cursor-pointer"
            onClick={showInputHandler}
          >
            <path
              d="M8.03228 0.934937C12.1881 0.934937 15.561 4.13657 15.561 8.08145C15.561 12.0263 12.1881 15.228 8.03228 15.228C3.87645 15.228 0.503601 12.0263 0.503601 8.08145C0.503601 4.13657 3.87645 0.934937 8.03228 0.934937ZM8.03228 13.6398C11.2675 13.6398 13.8879 11.1525 13.8879 8.08145C13.8879 5.01043 11.2675 2.52305 8.03228 2.52305C4.79704 2.52305 2.17664 5.01043 2.17664 8.08145C2.17664 11.1525 4.79704 13.6398 8.03228 13.6398ZM15.1304 13.6963L17.4964 15.9422L16.3134 17.0652L13.9474 14.8193L15.1304 13.6963Z"
              fill="#252931"
            />
          </svg>
          <div className="w-[1px] h-4 bg-[#82868F]"></div>
          <UserButton />
        </div>
      </div>
      {/* drawer */}
      <Drawer
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={open}
        key={"left"}
      >
        <div className="flex justify-between mb-5 font-inter">
          <h1 className="text-lg font-light">Todo-app</h1>
          <button type="button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex flex-col gap-2 font-inter text-sm">
          <Link to="/">Todos</Link>
          <Link to="/my-day">My Day</Link>
          <Link to="/important">Important</Link>
          <Link to="/complete">Complete</Link>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
