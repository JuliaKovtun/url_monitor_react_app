import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { Link } from "react-router-dom";

const Registration = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/signup", { user: formData });
  
      const token = response.headers["authorization"]?.split(" ")[1];
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(response.data.data.email));
        setUser(response.data.data.email);
        navigate("/url_monitors");
      } else {
        setError("Signup successful, but login failed.");
      }
    } catch (err) {
      setError("Signup failed! Check your details.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center">Register</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              required
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
