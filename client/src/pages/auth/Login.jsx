import React, { useState } from "react";
import { login } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await login(formData);
      localStorage.setItem("token", res.data.token); // Save token
      window.dispatchEvent(new Event("authChanged"));
      navigate("/dashboard"); // Go to home or dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-50 mx-auto card mt-5 p-4">
      <h2 className="m-auto mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
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
            Login
          </button>
        </div>
        <div className="text-center mt-3">
          <small>
            Don’t have an account?{" "}
            <a href="/signup" className="text-primary">
              Sign up
            </a>
          </small>
        </div>
      </form>
    </div>
  );
};

export default Login;
