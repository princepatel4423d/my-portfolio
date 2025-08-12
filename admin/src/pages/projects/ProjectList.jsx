import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { ToastContext } from "@/context/ToastContext";

const ProjectList = () => {
  const { backendUrl } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [filterType, setFilterType] = useState(""); // "" (all), "big", or "small"

  // Fetch projects from backend
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const url = filterType
        ? `${backendUrl}/api/project/projects?type=${filterType}`
        : `${backendUrl}/api/project/projects`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch projects");

      const data = await res.json();
      setProjects(data);
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filterType]);

  // Delete project handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    setDeletingId(id);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${backendUrl}/api/project/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorResp = await res.json();
        throw new Error(errorResp.error || "Failed to delete project");
      }

      addToast("Project deleted successfully", "success");
      await fetchProjects();
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-600 font-semibold text-lg">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-extrabold text-gray-900">Project Management</h1>

        <div className="flex items-center gap-3 flex-wrap">
          <select
            aria-label="Filter Projects by Type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="big">Big Projects</option>
            <option value="small">Small Projects</option>
          </select>

          <button
            onClick={() => navigate("/projects/add")}
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Add New Project"
          >
            + Add Project
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article
              key={project._id}
              className="bg-white rounded-lg shadow p-6 flex flex-col"
              aria-label={`${project.type} project titled ${project.title}`}
            >
              {/* Project Image */}
              {project.type === "big" && project.imageUrl && (
                <img
                  src={project.imageUrl.startsWith("http") ? project.imageUrl : `${backendUrl}${project.imageUrl}`}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded mb-4"
                  loading="lazy"
                />
              )}

              {/* Title and Description */}
              <h2 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h2>
              <p className="text-gray-700 flex-grow">{project.description}</p>

              {/* Tech Stack (Big projects) */}
              {project.type === "big" && project.stack?.length > 0 && (
                <p className="mt-3 text-sm text-gray-900">
                  <strong>Stack:</strong> {project.stack.join(", ")}
                </p>
              )}

              {/* Tags */}
              {project.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Buttons */}
              <div className="mt-4 flex gap-3">
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Source
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
                  >
                    Demo
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => navigate(`/projects/edit/${project._id}`)}
                  className="px-4 py-2 bg-yellow-500 rounded text-white hover:bg-yellow-600 transition"
                  type="button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className={`px-4 py-2 rounded text-white ${
                    deletingId === project._id ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                  } transition`}
                  disabled={deletingId === project._id}
                  type="button"
                >
                  {deletingId === project._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;