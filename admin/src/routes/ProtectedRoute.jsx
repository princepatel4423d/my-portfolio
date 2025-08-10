// src/components/ProtectedRoute.jsx
import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedin, getAdminProfile } = useContext(AppContext);

  // We'll add a local state 'authChecked' to track when the auth check is complete
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        try {
          await getAdminProfile(token);
          setAuthChecked(true);
        } catch (err) {
          setAuthChecked(true);
        }
      } else {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [getAdminProfile]);

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (!isLoggedin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;