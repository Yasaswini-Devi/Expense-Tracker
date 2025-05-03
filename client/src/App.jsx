import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/features/Dashboard";
import Header from "./components/Header";
import "./App.css";
import MonthlySummary from "./pages/features/Summary";
import Profile from "./pages/features/Profile";

function App() {
  return (
    <Router>
      <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/summary" element={<MonthlySummary />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </Router>
  );
}

export default App;
