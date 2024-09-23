import { NavLink } from "react-router-dom";
import { CiSun, CiStar } from "react-icons/ci";
import { FaRegChartBar } from "react-icons/fa";
import { MdDone } from "react-icons/md";

const SideBar = () => {
  return (
    <section className="bg-[#7BA0E7] w-[290px] min-h-screen pt-16 px-6 hidden xl:block ">
      <div className="flex flex-col gap-2 font-inter text-sm text-white">
        <NavLink to="/" className="flex items-center gap-2 hover:text-blue-800">
          <CiSun className="w-[22px] h-[22px]" /> Todos
        </NavLink>
        <NavLink
          to="/my-day"
          className="flex items-center gap-2 hover:text-blue-800"
        >
          <FaRegChartBar className="w-[22px] h-[22px]" /> Charts
        </NavLink>
        <NavLink
          to="/important"
          className="flex items-center gap-2 hover:text-blue-800"
        >
          <CiStar className="w-[22px] h-[22px]" /> Important
        </NavLink>
        <NavLink
          to="/complete"
          className="flex items-center gap-2 hover:text-blue-800"
        >
          <MdDone className="w-[22px] h-[22px]" /> Complete
        </NavLink>
      </div>
    </section>
  );
};

export default SideBar;
