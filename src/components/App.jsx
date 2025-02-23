import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Login from "./auth/Login";
import Signup from "./auth/Registration";
import API from "../api/axios";
import { jwtDecode } from "jwt-decode";
import Registration from "./auth/Registration";
import UrlMonitorDashboard from "./UrlMonitorDashboard";

const App = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          return null;
        }
        return JSON.parse(storedUser);
      } catch (error) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      API.get("/users/current", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
        });
    }
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/login"  element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/url_monitors" element={user ? <UrlMonitorDashboard /> : <Navigate to="/login" /> } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
