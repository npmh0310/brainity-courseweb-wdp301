import CourseContent from "../components/User/LearningPage/CourseContent/CourseContent"
import OverView from "../components/User/LearningPage/OverView/OverView"
import Search from "../components/User/LearningPage/Search/Search"
import Exercise from "../components/User/LearningPage/Exercise/Exercise"

export const routesLearningPage = [
    { index: true, element: <OverView /> },
    {
        path: "courseContent",
        element: <CourseContent />,
    },
    {
        path: "overView",
        element: <OverView/>,
    },
    {
        path: "search",
        element: <Search/>,
    },
    {
        path: "exercise",
        element: <Exercise/>,
    },
    
]


