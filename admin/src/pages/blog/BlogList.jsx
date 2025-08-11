import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { ToastContext } from "@/context/ToastContext";

const BlogList = () => {
  const { backendUrl } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingSlug, setDeletingSlug] = useState(null);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/blog/blogs`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      addToast(error.message || "Error loading blogs", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    setDeletingSlug(slug);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${backendUrl}/api/blog/delete/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to delete blog");
      }

      addToast("Blog deleted successfully.", "success");
      fetchBlogs();
    } catch (error) {
      addToast(error.message || "Error deleting blog", "error");
    } finally {
      setDeletingSlug(null);
    }
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-600 font-semibold text-lg">
        Loading Blogs...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header: title and create button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Blog List
        </h2>
        <button
          onClick={() => navigate("/blogs/add")}
          className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-2 text-white font-semibold transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          type="button"
          aria-label="Create New Blog"
        >
          + Create Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12 text-gray-600 font-semibold text-lg">
          No blogs found.
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map(({ slug, title, description, category, date }) => (
            <li
              key={slug}
              className="bg-white rounded-lg shadow border border-gray-200 flex flex-col justify-between"
            >
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {title}
                </h3>
                <p className="text-gray-700 flex-grow mb-4 line-clamp-3">
                  {description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-auto">
                  <span>
                    <strong className="font-semibold">Category:</strong> {category}
                  </span>
                  <span>
                    <strong className="font-semibold">Date:</strong>{" "}
                    {new Date(date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-3 flex justify-end gap-3">
                <Link
                  to={`/blogs/edit/${slug}`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Edit blog "${title}"`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(slug)}
                  disabled={deletingSlug === slug}
                  className={`inline-flex items-center px-4 py-2 rounded-md text-white text-sm font-semibold transition focus:outline-none focus:ring-2 ${
                    deletingSlug === slug
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  }`}
                  aria-label={`Delete blog "${title}"`}
                  type="button"
                >
                  {deletingSlug === slug ? "Deleting..." : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;