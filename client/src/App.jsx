import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import routes from "./routes/routes";
import teacherRoutes from "./routes/teacher.routes";

import PageWrapper from "./components/common/PageWrapper";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { GlobalStyles } from "@mui/material";
import ProfileUserPage from "./pages/ProfileUserPage";
import InformationProfile from "./components/User/ProfileUser/InformationProfile";
import FavoriteCourses from "./components/User/ProfileUser/FavoriteCourses";
import Security from "./components/User/ProfileUser/Security";
import TeacherPage from "./pages/Teacher/TeacherPage";
import CourseDetail from "./components/Teacher/ManageCourses/CourseDetail";

function App() {
  return (
    <>
      <GlobalStyles
        styles={{
          body: { paddingRight: "0 !important", overflow: "auto !important" },
        }}
      />
      {/* config toastify */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />

      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/teacher" element={<TeacherPage />}>
            {teacherRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children &&
                  route.children.map((child, childIndex) => (
                    <Route
                      key={childIndex}
                      path={child.path}
                      element={child.element}
                    />
                  ))}
              </Route>
            ))}
          </Route>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) =>
              route.index ? (
                <Route
                  index
                  key={index}
                  element={
                    <PageWrapper state={route.state}>
                      {route.element}
                    </PageWrapper>
                  }
                />
              ) : route.children ? (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PageWrapper state={route.state}>
                      {route.element}
                    </PageWrapper>
                  }
                >
                  {route.children.map((childRoute, childIndex) => (
                    <Route
                      key={childIndex}
                      path={childRoute.path}
                      element={
                        <PageWrapper state={childRoute.state}>
                          {childRoute.element}
                        </PageWrapper>
                      }
                    />
                  ))}
                </Route>
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    <PageWrapper state={route.state}>
                      {route.element}
                    </PageWrapper>
                  }
                />
              )
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

{
  /* <Route path="/" element={<MainLayout />}>
  <Route index element={<HomePage />} />
  <Route path="signin" element={<SignInPage />} />
  <Route path="signup" element={<SignUpPage />} />
  <Route path="path" element={<PathPage />} />
  <Route path="categories" element={<Categories />} />
  <Route path="mylearningcourse" element={<MyLearningCourse />} />
  <Route path="profile" element={<ProfileUserPage />}>
    <Route path="favoritecourses" element={<FavoriteCourses />} />
    <Route path="security" element={<Security />} />
  </Route>
</Route>; */
}
