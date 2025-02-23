//TODO: probably we don't need this
import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { io } from "socket.io-client";
import StatusGraph from "../components/StatusGraph";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const socket = io("http://localhost:3000");

  useEffect(() => {
    axios.get("/monitored_urls")
      .then(response => setUrls(response.data))
      .catch(error => console.error("Error fetching URLs:", error));

    socket.on("statusUpdate", (updatedUrl) => {
      setUrls((prevUrls) =>
        prevUrls.map(url => (url.id === updatedUrl.id ? updatedUrl : url))
      );
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <UrlMonitorForm/>
      <h1>Monitored URLs</h1>
      <table className="table">
        <thead>
          <tr>
            <th>URL</th>
            <th>Status</th>
            <th>Response Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(url => (
            <tr key={url.id} className={url.status === "down" ? "bg-danger text-white" : ""}>
              <td>{url.url}</td>
              <td>{url.status}</td>
              <td>{url.response_time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Status History</h2>
      {urls.map(url => (
        <StatusGraph key={url.id} url={url} />
      ))}
    </div>
  );
};

export default Dashboard;
