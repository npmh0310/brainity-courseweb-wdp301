import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import io from "socket.io-client";
import { getAllNotification, getRoom } from "../../../fetchData/Notification";

const NotificationsContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationsContext);
};

export const NotificationsProvider = ({ children, userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [rooms, setRooms] = useState([]);

  // dùng useCallback để component không bị tạo mới mỗi component re-render
  const fetchNotifications = useCallback(() => {
    getAllNotification()
      .then((response) => {
        if (response.data.success) {
          const { count, data } = response.data;
          const notificationData = data.map((item) => item);
          setNotifications(notificationData);
          setUnreadCount(count.unread);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  useEffect(() => {
    const socket = io("https://brainity-courseweb-wdp301.onrender.com");

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

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        rooms,
        unreadCount,
        setNotifications,
        setUnreadCount,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default useNotifications;
