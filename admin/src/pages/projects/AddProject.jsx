import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { ToastContext } from "@/context/ToastContext";

const AddProject = () => {
  const { backendUrl } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "small",
    title: "",
    description: "",
    imageUrl: "",
    stack: "",
    tags: "",
    sourceUrl: "",
    demoUrl: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.title.trim()) {
      addToast("Title is required.", "error");
      return false;
    }
    if (!form.description.trim()) {
      addToast("Description is required.", "error");
      return false;
    }
    if (form.type === "big") {
      if (!form.imageUrl.trim()) {
        addToast("Image URL is required for big projects.", "error");
        return false;
      }
      if (!form.stack.trim()) {
        addToast("Tech stack is required for big projects.", "error");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    const payload = {
      ...form,
      stack: form.stack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      tags: form.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${backendUrl}/api/project/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create project.");
      }

      addToast("Project created successfully!", "success");
      navigate("/projects");
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <h2 className="text-2xl font-bold text-gray-900">Add New Project</h2>

      <div>
        <label htmlFor="type" className="block mb-1 font-medium text-gray-700">
          Project Type
        </label>
        <select
          id="type"
          name="type"
          value={form.type}
          onChange={handleChange}
          disabled={submitting}
          className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="small">Small Project</option>
          <option value="big">Big Project</option>
        </select>
      </div>

      <div>
        <label htmlFor="title" className="block mb-1 font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          disabled={submitting}
          className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
          placeholder="Project title"
          maxLength={150}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          disabled={submitting}
          className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
          placeholder="Project description"
          rows={5}
          maxLength={1000}
          required
        />
      </div>

      {form.type === "big" && (
        <>
          <div>
            <label htmlFor="imageUrl" className="block mb-1 font-medium text-gray-700">
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
              disabled={submitting}
              className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div>
            <label htmlFor="stack" className="block mb-1 font-medium text-gray-700">
              Tech Stack (comma-separated)
            </label>
            <input
              id="stack"
              name="stack"
              type="text"
              value={form.stack}
              onChange={handleChange}
              disabled={submitting}
              className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
              placeholder="React, Node.js, MongoDB"
              required
            />
          </div>
        </>
      )}

      <div>
        <label htmlFor="tags" className="block mb-1 font-medium text-gray-700">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          value={form.tags}
          onChange={handleChange}
          disabled={submitting}
          className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
          placeholder="open-source, api, ui"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sourceUrl" className="block mb-1 font-medium text-gray-700">
            Source URL
          </label>
          <input
            id="sourceUrl"
            name="sourceUrl"
            type="url"
            value={form.sourceUrl}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
            placeholder="https://github.com/yourrepo"
          />
        </div>
        <div>
          <label htmlFor="demoUrl" className="block mb-1 font-medium text-gray-700">
            Demo URL
          </label>
          <input
            id="demoUrl"
            name="demoUrl"
            type="url"
            value={form.demoUrl}
            onChange={handleChange}
            disabled={submitting}
            className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900 focus:ring-2 focus:ring-blue-500"
            placeholder="https://demo.example.com"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded font-semibold transition disabled:opacity-50"
      >
        {submitting ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
};

export default AddProject;