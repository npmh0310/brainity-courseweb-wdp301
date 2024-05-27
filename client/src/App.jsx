import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
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


function App() {
  return (
    <>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
