import * as React from "react";
import SidebarProfileUser from "../components/User/ProfileUser/SidebarProfileUser";

import { Outlet } from "react-router-dom";

const ProfileUserPage = () => {
  return (
    <div className="pb-8 p-0 section bg-gray-100  ">
      <div className="container mx-auto flex flex-col justify-between md:flex-row">
        <SidebarProfileUser />
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileUserPage;
