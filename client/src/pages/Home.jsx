import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Home = () => {
  return (
    <div className="home-container mt-5 card m-auto">
      <h1 className="mb-4 fw-bold text-primary">Expense Tracker</h1>
      <p className="lead mb-4">
        Keep track of your spending, budget efficiently, and get insights into your financial habits.
      </p>

      <div className="action-buttons d-flex justify-content-center gap-4">
        <Link to="/login" className="btn primary-btn btn-lg shadow-sm">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
