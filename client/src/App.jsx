import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import AdminLayout from "./components/layout/AdminLayout";
import routes from "./routes/routes";
import teacherRoutes from "./routes/teacher.routes";

import PageWrapper from "./components/common/PageWrapper";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import LearningPage from "./pages/LearningPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { GlobalStyles } from "@mui/material";

import Dashboard from "./components/Admin/default/Dashboard";
import ConfirmTeacherTable from "./components/Admin/confirmTeacher/confirmTeacher";
import ConfirmCourseTable from "./components/Admin/confirmCourse/confirmCourse";
import ConfirmCourseDetail from "./components/Admin/confirmCourse/ConfirmCourseDetail";
import ConfirmBlogTable from "./components/Admin/confirmBlog/confirmBlog";
import ProfileUserPage from "./pages/ProfileUserPage";
import TeacherPage from "./pages/Teacher/TeacherPage";
import CourseDetail from "./components/Teacher/ManageCourses/CourseDetail";
import InformationProfile from "./components/User/ProfileUser/InformationProfile";
import FavoriteCourses from "./components/User/ProfileUser/FavoriteCourses";
import Security from "./components/User/ProfileUser/Security";

import { useEffect } from "react";
import { getIsLogin, validateToken } from "./redux/features/authSlice";
import { Toaster } from "react-hot-toast";
import { routesLearningPage } from "./routes/learningPage.routes";
import PaymentSuccess from "./components/User/Payment/PaymentSuccess";
import VideoChaper from "./components/User/LearningPage/VideoChapter/VideoChaper";
import { getCart } from "./redux/features/cartSlice";
import ChatBoxAdmin from "./pages/Admin/ChatBoxAdmin";
import PaymentResult from "./components/User/Payment";
import ConfirmCourseLayout from "./components/Admin/confirmCourse/ConfirmCourseLayout";
import ForgotPassWord from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(getIsLogin);

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);

  useEffect(() => {
    if (isLogin) {
      dispatch(getCart());
    }
  }, [dispatch, isLogin]);

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <GlobalStyles
        styles={{
          body: { paddingRight: "0 !important", overflow: "auto !important" },
        }}
      />
      {/* config toastify */}
      {/* <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgotPassword" element={<ForgotPassWord />} />
          <Route path="/reset_password/:token" element={<ResetPassword />} />

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

          {/* Route Learning Page */}

          <Route path="learningCourse/:id/*" element={<LearningPage />}>
            {/* {routesLearningPage.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                  ))} */}
          </Route>
          {/* Route Admin*/}

          <Route path="/admin/messageAdmin" element={<ChatBoxAdmin />} />
          <Route
            path="/admin/messageAdmin/:roomId"
            element={<ChatBoxAdmin />}
          />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="confirmTeacher" element={<ConfirmTeacherTable />} />
            <Route path="confirmCourse/*" element={<ConfirmCourseLayout />}>
              <Route path=":id" element={<ConfirmCourseDetail />} />
            </Route>
            <Route path="confirmBlog" element={<ConfirmBlogTable />} />
            <Route path="default" element={<Dashboard />} />
          </Route>

          {/* Route Payment Success*/}
          <Route path="/paymentSuccess" element={<PaymentSuccess />}></Route>
          <Route path="/payment" element={<PaymentResult />} />
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
