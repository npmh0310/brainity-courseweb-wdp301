import { Categories } from "../pages/Categories";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import PathPage from "../pages/PathPage";
import SignUpPage from "../pages/SignUpPage";
import BlogPage from "../pages/BlogPage";
import BlogDetail from "../components/BlogPage/BlogDetail";
import DraftEditor from "../components/BlogPage/WritingBlogForm";

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
    state: "path",
  },
  {
    path: "signin",
    element: <SignInPage />,
  },
  {
    path: "signup",
    element: <SignUpPage />,
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
];

export default routes;
