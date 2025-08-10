import React from "react";

export const GrayButton = ({ children, className = '', ...props }) => (
  <button
    className={`rounded-full px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors font-medium text-sm ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const BlueButton = ({ children, className = '', ...props }) => (
  <button
    className={`rounded-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium text-sm ${className}`}
    {...props}
  >
    {children}
  </button>
); 