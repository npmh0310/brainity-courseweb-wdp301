import { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import { getAllNotification, getRoom } from "../../../fetchData/Notification";
import { initializeWebSocket, getWebSocket } from "../../../utils/websocketManager"; // Adjust the import path as per your project structure
import { useSelector } from "react-redux";


const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [rooms, setRooms] = useState([]);
  const user = useSelector((state) => state.auth.user);

  // dùng useCallback để component không bị tạo mới mỗi component re-render
  const fetchNotifications = useCallback(() => {
    getAllNotification().then((response) => {
      const data = response.data.data.map((item) => item.notification);
      setNotifications(data);
    });
  }, []);

  useEffect(() => {

    // const socket = io("http://localhost:4000");
    initializeWebSocket(); // Initialize WebSocket when component mounts
    const socket = getWebSocket(); // Get the WebSocket instance
    
    getRoom().then((response) => {
      const data = Object.values(response.data.data);
      setRooms(data);
      data.forEach((room) => {
        socket.emit("joinRoom", room);
      });
    });

    fetchNotifications();

    socket.on("passwordChangeNotification", (data) => {
      setNotifications((prev) => [data.message, ...prev]);
      fetchNotifications();
    });

    socket.on("system", (data) => {
      setNotifications((prev) => [data.message, ...prev]);
      fetchNotifications();
    });

    socket.on("newLessonNotification", (data) => {
      setNotifications((prev) => [data.message, ...prev]);
      fetchNotifications();
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, fetchNotifications]);

  return { notifications, rooms };
};

export default useNotifications;
