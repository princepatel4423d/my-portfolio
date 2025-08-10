// src/context/AppContext.jsx

import React, { createContext } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // Get backend URL from environment; remove trailing slash if present
  const rawBackendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const backendUrl = rawBackendUrl.endsWith('/')
    ? rawBackendUrl.slice(0, -1)
    : rawBackendUrl;

  const value = {
    backendUrl,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
