import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarTeacher from "../../components/Teacher/SidebarTeacher";

import HeaderTeacher from "../../components/Teacher/Header/HeaderTeacher";
import { useSelector } from "react-redux";
const TeacherPage = () => {
  const [hiddenSidebar, setHiddenSidebar] = useState(false);
  const handleSidebar = () => {
    setHiddenSidebar(!hiddenSidebar);
  };
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (user.role === "user") {
    navigate("/");
  }

  return (
    <>
      {user.role === "teacher" ? (
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
      ) : (
        <div>hi</div>
      )}
    </>
  );
};

export default TeacherPage;
