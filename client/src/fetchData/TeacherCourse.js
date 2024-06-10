import axios from "./axios";

const CreateCourse = (data) => {
    console.log(data)
    return axios.post("/course/teacher", data);
}

const getCourseOfTeacher = () => {
    return axios.get("/course/teacher/getCourse");
}

const getCourseById = (id) => {
    return axios.get(`/course/getCourseById/${id}`);
}

const getCourseByName = (courseName) => {
    // console.log(courseName)
    return axios.post(`/course/getCourseByName`, courseName);
}

const updateCourse = (id, data) => {
    return axios.put(`/course/teacher/${id}`, data);
}


const deleteCourse = (id) => {
    return axios.delete(`/course/teacher/${id}`);
}

export {
    CreateCourse,
    getCourseOfTeacher,
    updateCourse,
    deleteCourse,
    getCourseById,
    getCourseByName
}