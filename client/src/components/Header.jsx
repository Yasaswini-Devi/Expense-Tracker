import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
  
    window.addEventListener("authChanged", checkLogin);
    checkLogin(); // run initially
  
    return () => window.removeEventListener("authChanged", checkLogin);
  }, []);  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login"); // ✅ Redirect to login after logout
  };

  return (
    <nav className="header navbar navbar-expand-lg shadow-sm">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand nav-link" to="/dashboard">
          <strong>Expense Tracker</strong>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/summary">
                Summary
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <span className="nav-link" role="button" onClick={handleLogout}>
                  Logout
                </span>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
