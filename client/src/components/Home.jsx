import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4 fw-bold text-primary">Welcome to Expense Tracker</h1>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/login" className="btn btn-primary btn-lg">
          Login
        </Link>
        <Link to="/signup" className="btn btn-success btn-lg">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Home;