/* eslint-disable */
import { HiX } from "react-icons/hi";
import SidebarLinks from "./AdminLinks";
import { Link } from "react-router-dom";
import routes from "../../routes/admin.routes";
import Logo from "../../assets/images/logo.png";

const AdminSidebar = ({ open, onClose }) => {
  return (
    <div
      className={`duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white shadow-2xl shadow-white/5 transition-all
         ${open ? "translate-x-0" : "-translate-x-96"} w-1/3 lg:w-1/6`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className="px-16 py-3 flex items-center">
        <Link to="/">
          <img src={Logo} alt="" className="w-full" />
        </Link>
      </div>
      <div className="h-px bg-gray-300" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <SidebarLinks routes={routes} />
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default AdminSidebar;
