import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);

  const backendUrl = "https://my-portfolio-backend-1p0l.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLoggedin(true);
      getAdminProfile(token);
    }
  }, []);

  const getAdminProfile = async (tokenStored) => {
    const token = tokenStored || localStorage.getItem("adminToken");
    if (!token) return;

    try {
      const res = await axios.get(`${backendUrl}/api/admin/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminProfile(res.data);
      setIsLoggedin(true);
    } catch (err) {
      setIsLoggedin(false);
      setAdminProfile(null);
      localStorage.removeItem("adminToken");
    }
  };

  return (
    <AppContext.Provider
      value={{ backendUrl, isLoggedin, setIsLoggedin, adminProfile, setAdminProfile, getAdminProfile }}
    >
      {children}
    </AppContext.Provider>
  );
};
