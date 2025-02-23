import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/login", { user: formData });

      const token = response.headers["authorization"]?.split(" ")[1];
      if (token) {
        localStorage.setItem("token", token);

        const userData = response.data.status.data.user.email;
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        navigate("/url_monitors");
      } else {
        setError("Login failed! No token received.");
      }
    } catch (err) {
      setError("Login failed! Check your email and password.");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
