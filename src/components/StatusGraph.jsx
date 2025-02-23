//TODO: probably don't need this
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const StatusGraph = ({ url }) => {
  return (
    <div>
      <h4>{url.url} - Response Time</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={url.history}>
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="response_time" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusGraph;
