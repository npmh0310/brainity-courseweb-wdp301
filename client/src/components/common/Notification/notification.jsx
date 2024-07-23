import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { getAllNotification, getRoom } from "../../../fetchData/Notification";
import { useSelector } from "react-redux";

const NotificationsComponent = () => {
  const [notification, setNotification] = useState([]);
  const [rooms, setRooms] = useState("");
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const socket = io("http://localhost:4000");

    getRoom().then((response) => {
      const data = Object.values(response.data.data);
      setRooms(data);
      for (let room of data) {
        socket.emit("joinRoom", room);
      }
    });
    getAllNotification().then((response) => {
      const data = response.data.data.map((item) => item.notification);
      setNotification(data);
    });
    // setNotification(["All message"]);
    socket.on("passwordChangeNotification", (data) => {
      setNotification((prev) => [data.message, ...prev]);
    });

    socket.on("system", (data) => {
      setNotification((prev) => [data.message, ...prev]);
    });

    socket.on("newLessonNotification", (data) => {
      setNotification((prev) => [data.message, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>WebSocket Notifications:</h2>
      <h2>{notification.length}</h2>
      {notification?.map((item) => (
        <div key={item._id}>{item.message}</div>
      ))}
    </div>
  );
};
export default NotificationsComponent;
