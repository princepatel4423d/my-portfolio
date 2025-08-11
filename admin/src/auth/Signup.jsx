import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ToastContext } from "../context/ToastContext";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getAdminProfile } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const { data } = await axios.post(`${backendUrl}/api/admin/register`, { name, email, password });
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        setIsLoggedin(true);
        await getAdminProfile(data.token);
        addToast("Registration successful", "success");
        navigate("/dashboard");
      } else {
        setErrorMsg(data.message || "Signup failed");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong");
      addToast(error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-teal-500 to-blue-800 px-4 py-8">
      <div className="max-w-md w-full p-8 bg-white rounded-3xl shadow-2xl border border-green-100">
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center mb-8 text-green-700">
          Admin Signup
        </h2>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <input
            type="text"
            required
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 placeholder-gray-400"
          />
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 placeholder-gray-400"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-md hover:from-green-700 hover:to-green-800 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Error message */}
        {errorMsg && (
          <p className="text-center text-red-600 mt-4 text-sm font-medium">
            {errorMsg}
          </p>
        )}

        {/* Login link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already registered?{" "}
          <button
            className="underline text-blue-600 hover:text-blue-800 font-medium"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;