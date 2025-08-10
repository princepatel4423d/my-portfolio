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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-900">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:border-blue-400"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:border-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {errorMsg && <p className="text-center text-red-600 mt-3">{errorMsg}</p>}
        <div className="mt-5 text-center text-sm text-white">
          Don't have an account?{" "}
          <button className="underline" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;