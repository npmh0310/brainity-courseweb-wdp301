import { Categories } from "../pages/Categories";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import PathPage from "../pages/PathPage";
import SignUpPage from "../pages/SignUpPage";

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
];

export default routes;
