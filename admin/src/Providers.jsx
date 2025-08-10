import React from 'react';
import { AppContextProvider } from '@/context/AppContext';
import { ToastProvider } from '@/context/ToastContext';

const Providers = ({ children }) => {
  return (
    <ToastProvider>
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </ToastProvider>
  );
};

export default Providers; 