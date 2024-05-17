import { Categories } from "../pages/Categories";
import HomePage from "../pages/HomePage";
import PathPage from "../pages/PathPage";

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
];

export default routes;
