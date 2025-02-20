import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000/cable");

const useWebSocket = () => {
  const [statusUpdates, setStatusUpdates] = useState([]);

  useEffect(() => {
    socket.on("status_updates", (data) => {
      console.log("Received WebSocket data:", data);
      setStatusUpdates((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  return statusUpdates;
};

export default useWebSocket;
