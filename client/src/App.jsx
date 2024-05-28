import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";
import routes from "./routes/routes";
import PageWrapper from "./components/common/PageWrapper";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LearningPage from "./pages/LearningPage";
import CourseContent from "./components/LearningPage/CourseContent/CourseContent";
import OverView from "./components/LearningPage/OverView/OverView";
import Search from "./components/LearningPage/Search/Search";
import Exercise from "./components/LearningPage/Exercise/Exercise";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
// import Market from "./components/common/Admin/marketplace/index"
import { GlobalStyles } from "@mui/material";
import Dashboard from "./components/common/Admin/default/Dashboard";
import ConfirmTeacherTable from "./components/common/Admin/confirmTeacher/confirmTeacher";
import ConfirmCourseTable from "./components/common/Admin/confirmCourse/confirmCourse";
import ConfirmBlogTable from "./components/common/Admin/confirmBlog/confirmBlog";
import ProfileUserPage from "./pages/ProfileUserPage";
import InformationProfile from "./components/ProfileUser/InformationProfile";
import FavoriteCourses from "./components/ProfileUser/FavoriteCourses";
import Security from "./components/ProfileUser/Security";


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

          <Route path="learning/*" element = {<LearningPage/>}>
            <Route path="courseContent" element={<CourseContent/>} />
            <Route path="overView" element={<OverView/>} />
            <Route path="search" element={<Search/>}/>
            <Route path="exercise" element={<Exercise/>}/>
          </Route>
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="confirmTeacher" element={<ConfirmTeacherTable />} />
            <Route path="confirmCourse" element={<ConfirmCourseTable />} />
            <Route path="confirmBlog" element={<ConfirmBlogTable />} />
            <Route path="default" element={<Dashboard />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

{/* <Route path="/" element={<MainLayout />}>
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
</Route>; */}
