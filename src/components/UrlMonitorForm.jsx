import React, { useState } from 'react';
import API from "../api/axios";


const UrlMonitorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    check_interval: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await API.post("/url_monitors", { url_monitor: formData, headers: { Authorization: `Bearer ${token}` } })
      if (response.status === 201) {
        setFormData({
          name: '',
          url: '',
          check_interval: ''
        });

        onSuccess(response.data);
      } else {
        console.error('Failed to create URL Monitor');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="check_interval">Check Interval (minutes):</label>
        <input
          type="number"
          id="check_interval"
          name="check_interval"
          value={formData.check_interval}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create URL Monitor</button>
    </form>
  );
};

export default UrlMonitorForm;
