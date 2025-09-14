import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarTeacher from "../../components/Teacher/SidebarTeacher";

import HeaderTeacher from "../../components/Teacher/Header/HeaderTeacher";
const TeacherPage = () => {
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const handleSidebar = () => {
    setHiddenSidebar(!hiddenSidebar);
  };

  return (
    <div className="mx-auto bg-white">
      <HeaderTeacher
        hiddenSidebar={hiddenSidebar}
        handleSidebar={handleSidebar}
      />
      <div className="min-h-[100vh] mx-auto w-full flex ">
        <SidebarTeacher hiddenSideBar={hiddenSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherPage;
