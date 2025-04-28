import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExpenseTracker from "./components/dashboard/ExpenseTracker";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ExpenseTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
