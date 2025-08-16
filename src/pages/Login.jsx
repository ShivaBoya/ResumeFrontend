import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // 'success' | 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");
  setStatus("");

  try {
    const res = await axios.post(BASE_URL+"/users/login", formData);

    setMessage(res.data.message || "Login successful!");
    setStatus("success");

    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // Trigger storage event so App updates login state
    window.dispatchEvent(new Event("storage"));

    navigate("/", { replace: true });
  } catch (err) {
    setMessage(err.response?.data?.message || "Login failed! Please try again.");
    setStatus("error");
  } finally {
    setLoading(false);
  }
};

  const inputBaseClasses = `w-full border rounded-lg p-3 mb-4 focus:outline-none transition-all duration-200`;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <form
        onSubmit={handleLogin}
        className={`bg-white shadow-lg rounded-xl p-8 w-full max-w-md transition-all duration-300
          ${loading ? "opacity-75 scale-[0.98]" : "opacity-100 scale-100"}`}
        aria-label="Login Form"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          className={`${inputBaseClasses} ${
            status === "error"
              ? "border-red-400 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
          aria-invalid={status === "error" ? "true" : "false"}
        />

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          className={`${inputBaseClasses} ${
            status === "error"
              ? "border-red-400 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
          aria-invalid={status === "error" ? "true" : "false"}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
          aria-busy={loading}
          aria-live="polite"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p
            role={status === "error" ? "alert" : undefined}
            className={`mt-4 text-center text-sm transition-all duration-300 ${
              status === "success"
                ? "text-green-600 font-medium"
                : "text-red-600 font-medium"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
