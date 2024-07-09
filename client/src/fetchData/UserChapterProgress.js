import axios from "./axios";
const url = '/userChapterProgress'

export const getLessonProgressUser = (id) => {
    return axios.get(url + "/getLessonsProgressUser/" + id)
}

export const completedLesson = ({courseId, lessonId , isCompleted }) => {
    return axios.put(url + "/completedLesson" , {courseId, lessonId , isCompleted } )
}

export const completeCourse = (courseId) => {
    return axios.put(url + "/completedCourse" , {courseId: courseId})
}