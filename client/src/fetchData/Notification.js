import axios from "./axios";

const getAllNotification = () => {
  return axios.get("/notification");
};

const getRoom = () => {
  return axios.get("/notification/rooms");
};

const markOneNotiAsRead = (userNotificationId) => {
  return axios.put(`/notification/markRead/${userNotificationId}`);
};

export { getAllNotification, getRoom, markOneNotiAsRead };
