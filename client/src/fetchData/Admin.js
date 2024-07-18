import axios from './axios';

const getAllCourses = () => {
    return axios.get('/course');
}

const getAllCategories = () => {
    return axios.get('/category');
}

const getCourseById = (courseId) => {
    return axios.get(`/course/${courseId}`);
  };

  const getSectionById = (sectionId) => {
    return axios.get(`/section/${sectionId}`);
  };
  const getAllCourseForConfirm = () => {
    return axios.get("/course/confirm/getCourse");
  }
  const confirmCourse = (id) => {
    return axios.put(`/course/confirm/${id}`);
  }
  const rejectCourse = (id) => {
    return axios.put(`/course/reject/${id}`);
  }
export{
    getAllCourses,
    getAllCategories,
    getCourseById,
    getSectionById,
    getAllCourseForConfirm,
    confirmCourse,
    rejectCourse
}