import axios from "./axios";

const CreateCourse = (data) => {
    // console.log(data)
    return axios.post("/course/teacher", data);
}

const getCourseOfTeacher = (page = 0) => {
    return axios.get(`/course/teacher/getCourse?page=${page}`);
  };

  
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

///////////////////////////////////////// Section
const getSectionById = (id) => {
    return axios.get(`/section/${id}`);
}

const createSection = (data, courseId) => {
    // console.log(data)
    return axios.post(`/section/${courseId}`, data);
}

const updateSection = (id, data) => {
    return axios.put(`/section/${id}`, data);
}

const deleteSection = (id) => {
    return axios.delete(`/section/${id}`);
}

///////////////////////////////////////// Lesson
const createLesson = (data, sectionId) => {
    // console.log(data)
    return axios.post(`/lesson/${sectionId}`, data);
}

const updateLesson = (id, data) => {
    return axios.put(`/lesson/${id}`, data);
}

const deleteLesson = (id) => {
    return axios.delete(`/lesson/${id}`);
}

const createLinkUrl = (file) => {
    // console.log(data)
    return axios.post(`/cloudinary/upload`, file);
}

const getAllCategory = () => {
    return axios.get('/category');
}

export {
    CreateCourse, getCourseOfTeacher, updateCourse, deleteCourse, getCourseById, getCourseByName,
    getSectionById, createSection, updateSection, deleteSection,
    createLesson, deleteLesson, updateLesson, createLinkUrl,
    getAllCategory
}