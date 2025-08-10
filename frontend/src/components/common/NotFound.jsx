import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="text-center max-w-xl">
        {/* SVG Illustration */}
        <div className="mb-8">
          <svg
            className="mx-auto w-48 h-48"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="none"
          >
            <circle cx="256" cy="256" r="256" fill="#e4e4e7" />
            <path
              d="M176 320h-32a16 16 0 010-32h32a16 16 0 010 32zm192 0h-32a16 16 0 010-32h32a16 16 0 010 32zM256 384c-24 0-48-16-48-16s24-16 48-16 48 16 48 16-24 16-48 16z"
              fill="#4b5563"
            />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              fill="#111827"
              fontSize="80"
              fontWeight="bold"
              dy=".35em"
            >
              404
            </text>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h1>

        {/* Subtitle */}
        <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
          Sorry, the page you are looking for might have been removed, renamed, or is temporarily unavailable.
        </p>

        {/* Call to Action */}
        <Link
          to="/"
          className="inline-block px-6 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-full border border-transparent hover:opacity-90"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;