import React, { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { ToastContext } from "@/context/ToastContext";
import { useNavigate } from "react-router-dom";

const AddExperience = () => {
  const { backendUrl } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);
  const [form, setForm] = useState({
    role: "",
    company: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    techStack: "",
    highlights: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({
        ...f,
        [name]: checked,
        ...(name === "isCurrent" && checked ? { endDate: "" } : {}),
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!form.role.trim()) {
      addToast("Role is required.", "error");
      return false;
    }
    if (!form.company.trim()) {
      addToast("Company is required.", "error");
      return false;
    }
    if (!form.startDate) {
      addToast("Start date is required.", "error");
      return false;
    }
    if (!form.isCurrent && !form.endDate) {
      addToast("End date is required unless 'Currently working' is checked.", "error");
      return false;
    }
    if (!form.description.trim()) {
      addToast("Description is required.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${backendUrl}/api/experience/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: form.role.trim(),
          company: form.company.trim(),
          location: form.location.trim() || undefined,
          description: form.description.trim(),
          startDate: form.startDate,
          endDate: form.isCurrent ? null : form.endDate || null,
          highlights: form.highlights
            .split("\n")
            .map((h) => h.trim())
            .filter(Boolean),
          techStack: form.techStack
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to add experience");
      }

      addToast("Experience added successfully!", "success");
      navigate("/experiences"); 
    } catch (e) {
      addToast(e.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
    >
      <h2 className="text-2xl font-semibold text-gray-900">Add Experience</h2>

      <div>
        <label htmlFor="role" className="block mb-1 font-medium text-gray-700">
          Role <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="role"
          name="role"
          value={form.role}
          onChange={onChange}
          disabled={submitting}
          maxLength={100}
          required
          placeholder="Ex: Frontend Developer"
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="company" className="block mb-1 font-medium text-gray-700">
          Company <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={form.company}
          onChange={onChange}
          disabled={submitting}
          maxLength={150}
          required
          placeholder="Ex: ABC Tech"
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="location" className="block mb-1 font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={form.location}
          onChange={onChange}
          disabled={submitting}
          maxLength={100}
          placeholder="City, State, Country"
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="flex-1">
          <label htmlFor="startDate" className="block mb-1 font-medium text-gray-700">
            Start Date <span className="text-red-600">*</span>
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={form.startDate}
            onChange={onChange}
            disabled={submitting}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="endDate"
            className={`block mb-1 font-medium text-gray-700 ${
              form.isCurrent ? "text-gray-400" : ""
            }`}
          >
            End Date {form.isCurrent && "(Currently working)"}
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={form.endDate}
            onChange={onChange}
            disabled={submitting || form.isCurrent}
            required={!form.isCurrent}
            className={`w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 ${
              form.isCurrent ? "opacity-50 cursor-not-allowed border-gray-300" : "border-gray-300"
            }`}
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isCurrent"
          name="isCurrent"
          checked={form.isCurrent}
          onChange={onChange}
          disabled={submitting}
          className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer"
        />
        <label htmlFor="isCurrent" className="select-none font-medium text-gray-700">
          Currently working here
        </label>
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-medium text-gray-700">
          Description <span className="text-red-600">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={form.description}
          onChange={onChange}
          disabled={submitting}
          required
          maxLength={1000}
          placeholder="Brief description of your responsibilities and achievements"
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="highlights" className="block mb-1 font-medium text-gray-700">
          Highlights (one per line)
        </label>
        <textarea
          id="highlights"
          name="highlights"
          rows={4}
          value={form.highlights}
          onChange={onChange}
          disabled={submitting}
          placeholder="Enter each highlight on a separate line"
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="techStack" className="block mb-1 font-medium text-gray-700">
          Tech Stack (comma separated)
        </label>
        <input
          type="text"
          id="techStack"
          name="techStack"
          value={form.techStack}
          onChange={onChange}
          disabled={submitting}
          placeholder="e.g. React, Node.js, MongoDB"
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {submitting ? "Creating..." : "Create Experience"}
        </button>
      </div>
    </form>
  );
};

export default AddExperience;