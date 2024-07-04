import axios from "./axios";

const getAllNotification = () => {
  return axios.get("/notification");
};

const getRoom = () => {
  return axios.get("/notification/rooms");
};

export {
    getAllNotification,
    getRoom
  };
  
