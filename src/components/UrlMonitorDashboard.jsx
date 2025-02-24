import React, { useState, useEffect } from 'react';
import API from '../api/axios';
import UrlMonitorChart from './UrlMonitorChart';
import UrlMonitorForm from './UrlMonitorForm';
import useWebSocket from "../hooks/useWebSocket";

const UrlMonitorDashboard = () => {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const updates = useWebSocket(); 

  useEffect(() => {
    const fetchMonitors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get('/url_monitors', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setMonitors(response.data);
        } else {
          setError('Failed to fetch URL monitors');
        }
      } catch (err) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchMonitors();
  }, []);

  useEffect(() => {
    if (updates.length > 0) {
      setMonitors((prevMonitors) => {
        return prevMonitors.map((monitor) => {
          const update = updates.find((u) => u.monitor_id === monitor.id);

          if (update) {
            return {
              ...monitor,
              status: update.status,
              last_checked_at: update.last_checked_at,
              checks: [...monitor.checks, update.check]
            };
          }

          return monitor;
        });
      });
    }
  }, [updates]);

  const handleMonitorCreation = (newMonitor) => {
    setMonitors((prevMonitors) => [newMonitor, ...prevMonitors]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      <UrlMonitorForm onSuccess={handleMonitorCreation} />
      <h2>URL Monitor Dashboard</h2>
      {monitors.length > 0 ? (
        monitors.map((monitor) => <UrlMonitorChart key={monitor.id} data={monitor} />)
      ) : (
        <p>No URL monitors available.</p>
      )}
    </div>
  );
};

export default UrlMonitorDashboard;
