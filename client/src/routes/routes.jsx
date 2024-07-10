import { Categories } from "../pages/Categories";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import PathPage from "../pages/PathPage";
import SignUpPage from "../pages/SignUpPage";
import BlogPage from "../pages/BlogPage";
import BlogDetail from "../components/User/BlogPage/BlogDetail";
import DraftEditor from "../components/User/BlogPage/WritingBlogForm";
import ProfileUserPage from "../pages/ProfileUserPage";
import MyLearningCourse from "../pages/MyLearningCourse";
import FavoriteCourses from "../components/User/ProfileUser/FavoriteCourses";
import Security from "../components/User/ProfileUser/Security";
import InformationProfile from "./../components/User/ProfileUser/InformationProfile";
import CourseDetail from "../pages/CourseDetail";
import CartPage from "../pages/CartPage";
import MyBlog from "../components/User/BlogPage/MyBlog";
import SavedBlog from "../components/User/BlogPage/SavedBlog";
import RequestToTeacher from "../components/User/ProfileUser/RequestToTeacher";
import { SearchPage } from "../components/User/SearchPage/SearchPage";

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
      {
        path: "request-to-teacher",
        element: <RequestToTeacher />,
      },
    ],
  },
  {
    path: "course/:id",
    element: <CourseDetail />,
  },
  {
    path: "blogpage",
    element: <BlogPage />,
  },
  {
    path: "/blogdetail/:id",
    element: <BlogDetail />,
  },
  {
    path: "/blogform",
    element: <DraftEditor />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },
  {
    path: "/myblog",
    element: <MyBlog />,
  },
  {
    path: "/savedblog",
    element: <SavedBlog />,
  },
  {
    path: "/searchpage",
    element: <SearchPage />,
  },
];

export default routes;
