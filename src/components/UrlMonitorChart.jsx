import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter
} from 'recharts';

const UrlMonitorChart = ({ data }) => {
  const { name, url, status, last_checked_at, checks } = data;

  const chartData = checks.map((check) => ({
    checked_at: new Date(check.checked_at).toLocaleTimeString(),
    response_time: check.response_time,
    success: check.success,
  }));

  
  return (
    <div className="monitor-container">
      {/* Display Monitor Info */}
      <div className="monitor-info">
        <h3>{name}</h3>
        <p><strong>URL:</strong> <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
        <p><strong>Status:</strong> {status ? status.toUpperCase() : "N/A"}</p>
        <p><strong>Last Checked:</strong> {last_checked_at ? new Date(last_checked_at).toLocaleString() : "N/A"}</p>
      </div>

      {/* Chart */}
      <div className="chart-container">
        {checks.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="checked_at" angle={-45} textAnchor="end" height={50} />
              <YAxis />
              <Tooltip />
              <Legend />
              
              {/* Line for Response Time */}
              <Line type="monotone" dataKey="response_time" stroke="#8884d8" />

              {/* Dots for Success/Failure */}
              <Scatter data={chartData} fill="#8884d8">
                {chartData.map((entry, index) => (
                  <circle
                    key={index}
                    cx={entry.checked_at}
                    cy={entry.response_time}
                    r={5}
                    fill={entry.success ? "green" : "red"} // Green for success, Red for failure
                  />
                ))}
              </Scatter>
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>No checks available yet.</p>
        )}
      </div>
    </div>
  );

};

export default UrlMonitorChart;
