import React from "react";

// Admin Imports
import MainDashboard from "../components/Admin/default/Dashboard";
import ConfirmTeacherTable from "../components/Admin/confirmTeacher/confirmTeacher";

import { MdHome } from "react-icons/md";
import { FaChalkboardTeacher, FaBook } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import ConfirmCourseTable from "../components/Admin/confirmCourse/confirmCourse";
import ConfirmBlogTable from "../components/Admin/confirmBlog/confirmBlog";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Teacher Confirmation",
    layout: "/admin",
    path: "confirmTeacher",
    icon: <FaChalkboardTeacher className="h-6 w-6" />,
    component: <ConfirmTeacherTable />,
  },
  {
    name: "Course Confirmation",
    layout: "/admin",
    path: "confirmCourse",
    icon: <FaBook className="h-6 w-6" />,
    component: <ConfirmCourseTable />,
  },
  {
    name: "Blog Confirmation",
    layout: "/admin",
    path: "confirmBlog",
    icon: <LuPencilLine className="h-6 w-6" />,
    component: <ConfirmBlogTable />,
  },
];
export default routes;
