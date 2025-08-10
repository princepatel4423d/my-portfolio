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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-800">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Signup</h2>
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <input
            type="text"
            required
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:border-green-400"
          />
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:border-green-400"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:border-green-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        {errorMsg && <p className="text-center text-red-600 mt-3">{errorMsg}</p>}
        <div className="mt-5 text-center text-sm text-gray-700">
          Already registered?{" "}
          <button className="underline text-blue-600" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;