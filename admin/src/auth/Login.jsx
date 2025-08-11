import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ToastContext } from "../context/ToastContext";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getAdminProfile } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        setIsLoggedin(true);
        await getAdminProfile(data.token);
        addToast("Login successful", "success");
        navigate("/dashboard");
      } else {
        setErrorMsg(data.message || "Login failed");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong");
      addToast(error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full p-8 bg-white rounded-3xl shadow-2xl border border-blue-100">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
          Admin Login
        </h2>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 placeholder-gray-400"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl shadow-md hover:from-blue-700 hover:to-blue-900 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Error Message */}
        {errorMsg && (
          <p className="text-center text-red-600 mt-4 text-sm font-medium">
            {errorMsg}
          </p>
        )}

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            className="underline text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;