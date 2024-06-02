import { Categories } from "../pages/Categories";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import PathPage from "../pages/PathPage";
import SignUpPage from "../pages/SignUpPage";
import ProfileUserPage from "../pages/ProfileUserPage";
import MyLearningCourse from "../pages/MyLearningCourse";
import FavoriteCourses from "../components/ProfileUser/FavoriteCourses";
import Security from "../components/ProfileUser/Security";
import InformationProfile from "./../components/ProfileUser/InformationProfile";
import CourseDetail from "../pages/CourseDetail";

const routes = [
  { index: true, element: <HomePage />, state: "home" },
  {
    path: "path",
    element: <PathPage />,
    state: "path",
  },
  {
    path: "categories",
    element: <Categories />,
    state: "categories",
  },

  {
    path: "mylearningcourse",
    element: <MyLearningCourse />,
  },
  {
    path: "profile",
    element: <ProfileUserPage />,
    children: [
      {
        path: "informationuser",
        element: <InformationProfile />,
      },
      {
        path: "favoritecourses",
        element: <FavoriteCourses />,
      },
      {
        path: "security",
        element: <Security />,
      },
    ],
  },
  {
    path : "course/:id",
    element: <CourseDetail/>
  }
];

export default routes;
