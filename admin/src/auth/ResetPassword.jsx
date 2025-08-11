import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ToastContext } from "../context/ToastContext";

const ResetPassword = () => {
  const { backendUrl, isLoggedin } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      addToast("New password must be at least 6 characters long.", "error");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      addToast("Passwords do not match.", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${backendUrl}/api/admin/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        addToast(data.message || "Password reset failed", "error");
      } else {
        addToast("Password reset successful", "success");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch (error) {
      addToast(error.message || "An error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedin)
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-center text-2xl mb-6 font-semibold">Reset Admin Password</h2>
        <p className="text-center text-red-600">You must be logged in to reset your password.</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full p-8 bg-white rounded-3xl shadow-2xl border border-blue-100">
        {/* Title */}
        <h2 className="text-center text-3xl font-extrabold text-blue-700 mb-8">
          Reset Password
        </h2>

        {/* Form */}
        <form onSubmit={handleReset} className="space-y-5">
          <input
            type="password"
            required
            minLength={6}
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-md hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;