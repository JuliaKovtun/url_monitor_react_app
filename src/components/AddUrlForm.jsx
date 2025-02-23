import React, { useState } from "react";
import axios from "../api/axios";

const AddUrlForm = ({ onUrlAdded }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/monitored_urls", { url })
      .then(response => {
        onUrlAdded(response.data);
        setUrl("");
      })
      .catch(error => console.error("Error adding URL:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-primary mt-2">Add URL</button>
    </form>
  );
};

export default AddUrlForm;
