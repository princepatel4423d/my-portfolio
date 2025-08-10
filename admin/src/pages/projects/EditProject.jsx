import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { ToastContext } from "@/context/ToastContext";

const EditProject = () => {
  const { backendUrl } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Form state for project data
  const [form, setForm] = useState({
    type: "small",    // "big" or "small"
    title: "",
    description: "",
    imageUrl: "",
    stack: "",
    tags: "",
    sourceUrl: "",
    demoUrl: "",
  });

  const [loading, setLoading] = useState(true);   // Loading existing project
  const [submitting, setSubmitting] = useState(false); // Form submit status

  // Fetch project data when component mounts or id changes
  useEffect(() => {
    if (!id) {
      addToast("Project ID not specified", "error");
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${backendUrl}/api/project/${id}`);
        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(errMsg || "Failed to fetch project data");
        }
        const data = await res.json();

        // Populate form fields, converting arrays to comma-separated strings
        setForm({
          type: data.type || "small",
          title: data.title || "",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
          stack: data.stack ? data.stack.join(", ") : "",
          tags: data.tags ? data.tags.join(", ") : "",
          sourceUrl: data.sourceUrl || "",
          demoUrl: data.demoUrl || "",
        });
      } catch (error) {
        addToast(error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, backendUrl, addToast]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation
  const validateForm = () => {
    if (!form.title.trim()) {
      addToast("Title is required", "error");
      return false;
    }
    if (!form.description.trim()) {
      addToast("Description is required", "error");
      return false;
    }
    if (form.type === "big") {
      if (!form.imageUrl.trim()) {
        addToast("Image URL is required for big projects", "error");
        return false;
      }
      if (!form.stack.trim()) {
        addToast("Tech stack is required for big projects", "error");
        return false;
      }
    }
    return true;
  };

  // Submit handler for updating project
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    // Prepare payload to send to backend, convert interested fields to arrays
    const payload = {
      ...form,
      stack: form.stack.split(",").map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${backendUrl}/api/project/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to update project");
      }

      addToast("Project updated successfully!", "success");
      navigate("/projects");
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading project...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
    >
      <h2 className="text-2xl font-bold mb-6">Edit Project</h2>

      {/* Project Type */}
      <div>
        <label htmlFor="type" className="block mb-1 font-medium">
          Project Type
        </label>
        <select
          id="type"
          name="type"
          value={form.type}
          onChange={handleChange}
          disabled={submitting}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="small">Small</option>
          <option value="big">Big</option>
        </select>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block mb-1 font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          disabled={submitting}
          className="w-full border border-gray-300 rounded px-3 py-2"
          maxLength={150}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block mb-1 font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          disabled={submitting}
          className="w-full border border-gray-300 rounded px-3 py-2"
          rows={5}
          maxLength={1000}
          required
        />
      </div>

      {/* Fields for Big Projects */}
      {form.type === "big" && (
        <>
          <div>
            <label htmlFor="imageUrl" className="block mb-1 font-medium">
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              disabled={submitting}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
              placeholder="https://example.com/image.jpg"
              type="url"
            />
          </div>

          <div>
            <label htmlFor="stack" className="block mb-1 font-medium">
              Technologies (comma-separated)
            </label>
            <input
              id="stack"
              name="stack"
              value={form.stack}
              onChange={handleChange}
              disabled={submitting}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="React, Node.js, MongoDB"
              required
            />
          </div>
        </>
      )}

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block mb-1 font-medium">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          disabled={submitting}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="open-source, ui, api"
        />
      </div>

      {/* Source & Demo URLs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sourceUrl" className="block mb-1 font-medium">
            Source URL
          </label>
          <input
            id="sourceUrl"
            name="sourceUrl"
            value={form.sourceUrl}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://github.com/username/repo"
            type="url"
          />
        </div>
        <div>
          <label htmlFor="demoUrl" className="block mb-1 font-medium">
            Demo URL
          </label>
          <input
            id="demoUrl"
            name="demoUrl"
            value={form.demoUrl}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://demo.example.com"
            type="url"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold disabled:opacity-50"
      >
        {submitting ? "Saving..." : "Update Project"}
      </button>
    </form>
  );
};

export default EditProject;