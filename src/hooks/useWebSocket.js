import { useState, useEffect } from "react";
import * as ActionCable from "@rails/actioncable";

const useWebSocket = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const cable = ActionCable.createConsumer("ws://localhost:3000/cable");

    const subscription = cable.subscriptions.create(
      { channel: "CheckUpdatesChannel" },
      {
        received: (data) => {
          console.log("Received WebSocket update:", data);
          setUpdates((prev) => [...prev, data]);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return updates;
};

export default useWebSocket;
