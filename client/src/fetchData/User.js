import axios from "./axios";
// import axios1 from "axios"

const onLogin = (data) => {
  return axios.post("/auth/login", data);
};

const onRegister = (data) => {
  return axios.post("/auth/register", data);
};

const getProfile = () => {
  return axios.get("/auth/profile");
};

const onLogout = () => {
  return axios.get("/auth/logout");
};
const updateUserProfile = (userId, data) => {
  return axios.put(`/auth/${userId}`, data);
};

const changePassword = (userId, data) => {
  return axios.put(`/auth/changePassword`, {
    userId,
    ...data,
  });
};

const updateProfile = (formData) => {
  return axios.put("/auth/profile", formData);
};
const updateAvatar = (avatar) => {
  return axios.put("/auth/updateAvatar", avatar);
};

const getAllCourseEnrolled = () => {
  return axios.get("/user/courseEnrolled");
};

const forgotPassword = (email) => {
  return axios.post("/auth/forgotPassword", { email: email });
};

const resetPassword = (form) => {
  return axios.post("/auth/resetPassword", form);
};

const getTotalDashboard = () => {
  return axios.get("/user/getTotalDashboard");
}

export {
  onLogin,
  onRegister,
  onLogout,
  getProfile,
  updateUserProfile,
  changePassword,
  updateProfile,
  updateAvatar,
  forgotPassword,
  resetPassword,
  getAllCourseEnrolled,
  getTotalDashboard,
};
