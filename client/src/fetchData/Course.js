import axios from "./axios";

const getAllCourse = () => {
    return axios.get("/course");
}

const getCoursePro = () => {
    return axios.get("/course/getCoursePro");
}

const getCourseFree = () => {
    return axios.get("/course/getCourseFree");
}

const getCourseById = (id) => {
    return axios.get(`/course/${id}`);
}

const postCourse = (course) => {
    return axios.post("/course", course);
}

const updateCourse = (id, course) => {
    return axios.put(`/course/${id}`, course);
}

const deleteCourse = (id) => {
    return axios.delete(`/course/${id}`);
}

const enrollCourseFree = (id, idCourse) => {
    return axios.put(`/auth/${id}/course/${idCourse}`)
}

const getFavouriteCourse = () => {
    return axios.get(`/favourite` );
}

export {
    getAllCourse,
    deleteCourse,
    getCourseById,
    getCourseFree,
    getCoursePro,
    postCourse,
    enrollCourseFree,
    updateCourse,
    getFavouriteCourse
}