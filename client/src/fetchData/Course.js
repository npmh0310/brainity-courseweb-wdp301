import axios from "./axios";

const getAllCourse = () => {
  return axios.get("/course");
};

const getCourseInHomePage = () => {
  return axios.get("/course/homepage");
};

const getCoursePro = () => {
  return axios.get("/course/getCoursePro");
};

const getCourseFree = () => {
  return axios.get("/course/getCourseFree");
};

const getCourseById = (id) => {
  return axios.get(`/course/${id}`);
};

const postCourse = (course) => {
  return axios.post("/course", course);
};

const updateCourse = (id, course) => {
  return axios.put(`/course/${id}`, course);
};

const deleteCourse = (id) => {
  return axios.delete(`/course/${id}`);
};

const enrollCourseFree = (id, idCourse) => {
  return axios.put(`/auth/${id}/course/${idCourse}`);
};

const getFavouriteCourse = () => {
  return axios.get(`/favourite`);
};

const deleteCourseInFavourite = (courseId) => {
  const data = { action: "remove", courseId };
  return axios.post(`/favourite`, data);
};

const addCourseInFavourite = (courseId) => {
  const data = { action: "add", courseId };
  return axios.post(`/favourite`, data);
};

const getCourseBySearch = (searchTerm) => {
  return axios.get(`/course/search/getCourseBySearch`, {
    params: {
      courseName: searchTerm,
    },
  });
};

const getStudents = (courseId) => {
  return axios.get("/course/getStudents/" + courseId);
};

// checkout
const createPayment = (amount) => {
  // const amount = 10000;
  return axios.post(`/vnpay/create_payment_url`, { amount: amount });
};

const updatePayment = (param) => {
  return axios.get(`/vnpay/vnpay_ipn${param}`);
};
export {
  getAllCourse,
  getCourseInHomePage,
  deleteCourse,
  getCourseById,
  getCourseFree,
  getCoursePro,
  postCourse,
  enrollCourseFree,
  updateCourse,
  getFavouriteCourse,
  deleteCourseInFavourite,
  addCourseInFavourite,
  getStudents,
  createPayment,
  updatePayment,
  getCourseBySearch,
};
