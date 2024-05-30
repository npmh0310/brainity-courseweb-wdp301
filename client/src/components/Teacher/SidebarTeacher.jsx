import React, { useEffect, useState } from "react";
import teacherRoutes from "../../routes/teacher.routes";
import { Link, useLocation } from "react-router-dom";
import { FolderKanban, SquareUser } from "lucide-react";

const SidebarTeacher = ({ hiddenSideBar }) => {
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation(); //save location hiện tại

  const handleActiveItem = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    const manageCoursesPath = "/teacher/managecourses/";
    if (location.pathname.startsWith(manageCoursesPath)) {
      setActiveItem("managecourses");
    } else {
      const currentItem = teacherRoutes.find(
        (item) => item.path === location.pathname
      );
      if (currentItem) {
        setActiveItem(currentItem.key);
      }
    }
  }, [location.pathname]);

  return (
    <div
      className={`${hiddenSideBar ? "hidden" : "flex"} w-1/5 transition-all mb-20 `}
    >
      <div className=" mx-auto w-full mt-6">
        <ul className="">
          {teacherRoutes.map((route, index) => (
            <li
              className={` text-third font-medium  ${
                activeItem === route.key
                  ? "bg-primary bg-opacity-15 border-r-4 border-primary"
                  : ""
              } hover:bg-primary hover:bg-opacity-15  block transition-all `}
              onClick={() => handleActiveItem(route.key)}
              key={index}
            >
              <Link
                className="flex items-center justify-center p-3 gap-x-3 w-full"
                to={route.path}
              >
                <span className="text-primary"> {route.icon}</span>{" "}
                <span>{route.display}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarTeacher;
