import io from "socket.io-client";

let socket = null;

export const initializeWebSocket = () => {
  if (!socket) {
    socket = io("http://localhost:4000");
    console.log("WebSocket initialized");
  }
};

export const getWebSocket = () => {
  if (!socket) {
    throw new Error("WebSocket is not initialized");
  }
  return socket;
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("WebSocket disconnected");
  }
};
