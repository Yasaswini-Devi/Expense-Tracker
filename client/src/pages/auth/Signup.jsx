import React, { useState } from "react";
import { register } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-50 mx-auto card mt-5">
      <h2 className="mb-5 mx-auto">Signup</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" onChange={handleChange} />
        <div className="input-group mb-2">
          <input
            className="form-control"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <span
            className="input-group-text"
            style={{ cursor: 'pointer' }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <i className="bi bi-eye-slash"></i>
            ) : (
              <i className="bi bi-eye"></i>
            )}
          </span>
        </div>
        <div className="d-flex justify-content-center">
          <button
            className="btn primary-btn btn-lg shadow-sm mt-3"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
