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
export{
    getAllCourses,
    getAllCategories,
    getCourseById,
    getSectionById

}