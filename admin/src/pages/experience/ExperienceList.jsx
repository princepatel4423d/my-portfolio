import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { ToastContext } from "@/context/ToastContext";

const ExperienceList = () => {
  const { backendUrl } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchExperiences = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backendUrl}/api/experience/experiences`);
      if (!res.ok) throw new Error("Failed to fetch experiences");
      const data = await res.json();
      setExperiences(data);
    } catch (e) {
      setError(e.message);
      addToast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) return;
    setDeletingId(id);

    try {
      const res = await fetch(`${backendUrl}/api/experience/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete experience");
      }
      addToast("Experience deleted successfully", "success");
      fetchExperiences();
    } catch (e) {
      addToast(e.message, "error");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchExperiences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-600 font-semibold text-lg dark:text-gray-300">
        Loading Experiences...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center text-red-600 bg-red-100 rounded dark:bg-red-900 dark:text-red-400">
        Error loading experiences: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header: title and add button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Experience List
        </h1>
        <button
          onClick={() => navigate("/experiences/add")}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-2 text-white font-semibold transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          type="button"
          aria-label="Add Experience"
        >
          + Add Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="max-w-4xl mx-auto p-6 text-center text-gray-600 dark:text-gray-400 font-semibold">
          No experiences found.
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp) => (
            <li
              key={exp._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col justify-between"
            >
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {exp.role}{" "}
                  <span className="font-normal text-gray-600 dark:text-gray-400">
                    @ {exp.company}
                  </span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {exp.location || "Location not specified"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {exp.startDate
                    ? `${new Date(exp.startDate).toLocaleDateString()} - ${
                        exp.endDate
                          ? new Date(exp.endDate).toLocaleDateString()
                          : "Present"
                      }`
                    : "Dates not specified"}
                </p>
                {exp.description && (
                  <p className="text-gray-700 dark:text-gray-300 mb-3 max-w-full whitespace-pre-line line-clamp-2">
                    {exp.description}
                  </p>
                )}
                {exp.highlights?.length > 0 && (
                  <ul className="list-disc list-inside mt-auto text-gray-600 dark:text-gray-400">
                    {exp.highlights.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
                {exp.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-end gap-3">
                <Link
                  to={`/experiences/edit/${exp._id}`}
                  className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold rounded-md transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  aria-label={`Edit experience: ${exp.role} at ${exp.company}`}
                  title={`Edit experience: ${exp.role} at ${exp.company}`}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(exp._id)}
                  disabled={deletingId === exp._id}
                  className={`inline-flex items-center px-4 py-2 rounded-md text-white text-sm font-semibold transition focus:outline-none focus:ring-2  ${
                    deletingId === exp._id
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  }`}
                  aria-label={`Delete experience: ${exp.role} at ${exp.company}`}
                  title={`Delete experience: ${exp.role} at ${exp.company}`}
                >
                  {deletingId === exp._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExperienceList;