import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getAllNotification, getRoom } from "../../../fetchData/Notification";
import {  useSelector } from "react-redux";



const NotificationsComponent = () => {
  const [notification, setNotification] = useState('');
  const [rooms, setRooms] = useState('');
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    const socket = io('http://localhost:4000');
     
      getRoom()
        .then(response => {
          const data = Object.values(response.data.data);
          setRooms(data);
          for (let room of data) {
            socket.emit('joinRoom', room);
          }
      })
    getAllNotification()
      .then(response => {
        const data = Object.values(response.data.data).map(notification => notification.notification.message);      
        setNotification(data);
      })
  // setNotification(["All message"]);
  
  // room recieve system change
  // socket.emit('joinRoom', { room: `room_system` });
  // // room recieve self change
  // socket.emit('joinRoom', { room: `room_profile_${user._id}` });
  // // room recieve course change 
  //   // 1. loop over course and join in these rooms
    // socket.emit('joinRoom', { room: `room_course_${course._id}` });
  // // room revieve teacher notification
  // socket.emit('joinRoom', { room: `room_teacher` });
  // // room revieve blog notification
  // socket.emit('joinRoom', { room: `room_blog`});
  // // room revieve blog author notification
  // socket.emit('joinRoom', { room: `room_blog_author` });

  


  socket.on('passwordChangeNotification', (data) => {
    setNotification(prev => [data.message, ... prev]);
  });

  socket.on('system', (data) => {
    setNotification(prev => [data.message, ... prev]);
  });


  socket.on('newLessonNotification', (data) => {
    setNotification(prev => [data.message, ... prev]);
  }); 

  return () => {
    socket.disconnect();
  };

}, []);
  return (
    <div>
      <h2>WebSocket Notifications:</h2>
      <p>{notification}</p>
    </div>
  );
};
export default NotificationsComponent;
