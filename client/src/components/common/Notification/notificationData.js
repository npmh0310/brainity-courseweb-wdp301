import io from "socket.io-client";
import { getAllNotification, getRoom } from "../../../fetchData/Notification";
import { EventEmitter } from "events";

const socket = io(`${process.env.REACT_APP_URL_CLIENT}`);
const eventEmitter = new EventEmitter();

let notifications = [];
let rooms = [];

const fetchRooms = async () => {
  try {
    const response = await getRoom();
    const data = Object.values(response.data.data);
    rooms = data;
    data.forEach((room) => {
      socket.emit("joinRoom", room);
    });
    eventEmitter.emit("roomsUpdated", rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
  }
};

const fetchNotifications = async () => {
  try {
    const response = await getAllNotification();
    notifications = response.data.data.map((item) => item.notification);
    eventEmitter.emit("notificationsUpdated", notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

const initSocketListeners = () => {
  socket.on("passwordChangeNotification", (data) => {
    notifications.push(data.message);
    eventEmitter.emit("notificationsUpdated", notifications);
  });

  socket.on("system", (data) => {
    notifications.push(data.message);
    eventEmitter.emit("notificationsUpdated", notifications);
  });

  socket.on("newLessonNotification", (data) => {
    notifications.push(data.message);
    eventEmitter.emit("notificationsUpdated", notifications);
  });
};

const init = async () => {
  await fetchRooms();
  await fetchNotifications();
  initSocketListeners();
};

const getNotifications = () => notifications;
const getRooms = () => rooms;
const subscribeToNotifications = (callback) => {
  eventEmitter.on("notificationsUpdated", callback);
};
const unsubscribeFromNotifications = (callback) => {
  eventEmitter.off("notificationsUpdated", callback);
};
const subscribeToRooms = (callback) => {
  eventEmitter.on("roomsUpdated", callback);
};
const unsubscribeFromRooms = (callback) => {
  eventEmitter.off("roomsUpdated", callback);
};

export {
  init,
  getNotifications,
  getRooms,
  subscribeToNotifications,
  unsubscribeFromNotifications,
  subscribeToRooms,
  unsubscribeFromRooms,
};
