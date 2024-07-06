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

const createPayment = () => {
  const amount = 10000;
  return axios.post(`/vnpay/create_payment_url`, { amount: amount });
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
  createPayment
};
