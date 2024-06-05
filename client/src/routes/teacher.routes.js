import ManageCourses from "../components/Teacher/ManageCourses/ManageCourses";
import ProfileTeacherPage from "../components/Teacher/Profile/ProfileTeacherPage";
import TeacherPage from "../pages/Teacher/TeacherPage";
import { FolderKanban, SquareUser } from "lucide-react";
import CourseDetail from "./../components/Teacher/ManageCourses/CourseDetail";
import CreateNewChapter from "../components/Teacher/ManageCourses/CreateNewChapter";
import SectionDetail from "../components/Teacher/ManageCourses/SectionDetail";
const teacherRoutes = [
  {
    display: "Manage Courses",
    path: "/teacher/managecourses",
    element: <ManageCourses />,
    key: "managecourses",
    icon: <FolderKanban size={20} />,
    children: [
      {
        display: "Course Detail",
        path: "/teacher/managecourses/:urlLink",
        key: "coursedetail",
        element: <CourseDetail />,
      },
      {
        display: "Course Detail",
        path: "/teacher/managecourses/:urlLink/:sectionId",
        key: "createnewchapter",
        element: <SectionDetail />,
      },
    ],
  },
  {
    display: "Manage Profile",
    path: "/teacher/profilepage",
    element: <ProfileTeacherPage />,
    key: "profilepage",
    icon: <SquareUser size={20} />,
  },
];

export default teacherRoutes;
