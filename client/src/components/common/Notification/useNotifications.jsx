import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { getAllNotification, getRoom } from "../../../fetchData/Notification";
import {
  initializeWebSocket,
  getWebSocket,
} from "../../../utils/websocketManager"; // Adjust the import path as per your project structure

const NotificationsContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationsContext);
};

export const NotificationsProvider = ({ children, userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [rooms, setRooms] = useState([]);
  const user = useSelector((state) => state.auth.user);

  initializeWebSocket(); // Initialize WebSocket when component mounts
  const socket = getWebSocket(); // Get the WebSocket instance

  const fetchNotifications = useCallback(() => {
    getAllNotification()
      .then((response) => {
        if (response.data.success) {
          const { count, data } = response.data;
          setNotifications(data);
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
    const handleNotification = (data) => {
      setNotifications((prev) => [data.message, ...prev]);
      fetchNotifications();
    };

    socket.on("passwordChangeNotification", handleNotification);
    socket.on("system", handleNotification);
    socket.on("newLessonNotification", handleNotification);

    getRoom().then((response) => {
      const data = Object.values(response.data.data);
      setRooms(data);
      data.forEach((room) => {
        socket.emit("joinRoom", room);
      });
    });

    fetchNotifications();

    return () => {
      socket.off("passwordChangeNotification", handleNotification);
      socket.off("system", handleNotification);
      socket.off("newLessonNotification", handleNotification);
      socket.disconnect();
    };
  }, [userId, fetchNotifications, socket]);

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
