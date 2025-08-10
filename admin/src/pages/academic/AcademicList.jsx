import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { ToastContext } from "@/context/ToastContext";
import { Link, useNavigate } from "react-router-dom";

const AcademicList = () => {
  const { backendUrl } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);
  const [academics, setAcademics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAcademics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backendUrl}/api/academic/academics`);
      if (!res.ok) throw new Error("Failed to fetch academic details");
      const data = await res.json();
      setAcademics(data);
    } catch (e) {
      addToast(e.message, "error");
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this academic record?")) return;
    setDeletingId(id);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${backendUrl}/api/academic/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete record");
      }
      addToast("Academic record deleted", "success");
      fetchAcademics();
    } catch (e) {
      addToast(e.message, "error");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchAcademics();
    // eslint-disable-next-line
  }, []);

  if (loading)
    return (
      <div className="text-center py-12 text-gray-600 font-semibold text-lg">
        Loading Academic Records...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-12 text-red-600 font-semibold text-lg">
        {error}
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Academic Details
        </h2>
        <button
          onClick={() => navigate("/academics/add")}
          className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-2 text-white font-semibold transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          type="button"
        >
          + Add Academic
        </button>
      </div>
      {academics.length === 0 ? (
        <div className="text-center py-12 text-gray-500 text-lg">
          No academic records found.
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {academics.map((acad) => (
            <li
              key={acad._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col justify-between"
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between mb-1">
                  <div className="font-semibold text-lg text-gray-900 dark:text-white">{acad.degree}</div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">{acad.startYear} - {acad.endYear || "Present"}</div>
                </div>
                <div className="mb-1 text-gray-700 dark:text-gray-300">{acad.institution}</div>
                {acad.major && <div className="mb-1 text-gray-600 dark:text-gray-400"><strong>Major:</strong> {acad.major}</div>}
                {acad.cgpa && <div className="mb-1 text-gray-600 dark:text-gray-400"><strong>CGPA:</strong> {acad.cgpa}</div>}
                {acad.notes && <div className="mb-2 text-gray-800 dark:text-gray-200">{acad.notes}</div>}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-end gap-3">
                <Link
                  to={`/academics/edit/${acad._id}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(acad._id)}
                  disabled={deletingId === acad._id}
                  className={`inline-flex items-center px-4 py-2 rounded-md text-white text-sm font-semibold transition focus:outline-none focus:ring-2 ${
                    deletingId === acad._id
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  }`}
                >
                  {deletingId === acad._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AcademicList;