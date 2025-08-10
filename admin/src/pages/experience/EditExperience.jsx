import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { ToastContext } from "@/context/ToastContext";

const EditExperience = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    role: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    highlights: "", // newline separated string for textarea
    techStack: "", // comma separated string for input
  });

  // Track if component is mounted to avoid state update on unmounted component
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!id) {
      setError("Experience ID is missing.");
      setLoading(false);
      return;
    }

    const fetchExperience = async () => {
      setLoading(true);
      setError(null);
      console.log("Fetching experience with ID:", id);
      try {
        const res = await fetch(`${backendUrl}/api/experience/${id}`);
        console.log("Response status:", res.status);
        if (!res.ok) {
          const text = await res.text();
          console.error("Fetch failed:", text);
          throw new Error(text || "Failed to fetch experience data");
        }

        const data = await res.json();
        console.log("Fetched experience data:", data);

        if (!isMounted.current) return;

        setForm({
          role: data.role || "",
          company: data.company || "",
          location: data.location || "",
          startDate: data.startDate ? data.startDate.slice(0, 10) : "",
          endDate: data.endDate ? data.endDate.slice(0, 10) : "",
          isCurrent: !data.endDate,
          description: data.description || "",
          highlights: (data.highlights || []).join("\n"),
          techStack: (data.techStack || []).join(", "),
        });
      } catch (err) {
        console.error("Error loading experience:", err);
        if (isMounted.current) {
          setError(err.message);
          addToast(err.message, "error");
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
          console.log("Set loading false");
        }
      }
    };

    fetchExperience();
  }, [backendUrl, id, addToast]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => {
        const updatedForm = { ...prev, [name]: checked };
        // Clear endDate if isCurrent checked
        if (name === "isCurrent" && checked) {
          updatedForm.endDate = "";
        }
        return updatedForm;
      });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
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
      addToast("End date is required unless marked as current.", "error");
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
    const token = localStorage.getItem("adminToken");

    // Prepare payload
    const payload = {
      role: form.role.trim(),
      company: form.company.trim(),
      location: form.location.trim() || undefined,
      startDate: form.startDate,
      endDate: form.isCurrent ? null : form.endDate || null,
      description: form.description.trim(),
      highlights: form.highlights
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean),
      techStack: form.techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(`${backendUrl}/api/experience/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Failed to update experience");
      }

      addToast("Experience updated successfully.", "success");
      navigate("/experiences"); // Make sure this route is correct in your app
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      if (isMounted.current) setSubmitting(false);
    }
  };

  // Debug logging render states
  console.log({ loading, error, submitting, form });

  if (loading)
    return (
      <div className="text-center py-8 text-gray-600 font-medium">
        Loading experience...
      </div>
    );

  if (error)
    return (
      <div className="max-w-xl mx-auto p-4 text-center text-red-600 bg-red-100 rounded">
        Error loading experience: {error}
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Edit Experience
      </h2>

      <div>
        <label
          htmlFor="role"
          className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
        >
          Role <span className="text-red-500">*</span>
        </label>
        <input
          id="role"
          name="role"
          type="text"
          value={form.role}
          onChange={handleChange}
          disabled={submitting}
          required
          maxLength={100}
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="company"
          className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
        >
          Company <span className="text-red-500">*</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          disabled={submitting}
          required
          maxLength={150}
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="location"
          className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
        >
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={form.location}
          onChange={handleChange}
          disabled={submitting}
          maxLength={100}
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="flex-1">
          <label
            htmlFor="startDate"
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
          >
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            disabled={submitting}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="endDate"
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
          >
            End Date {form.isCurrent ? "(Current)" : ""}
          </label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            disabled={submitting || form.isCurrent}
            required={!form.isCurrent}
            className={`w-full px-4 py-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              form.isCurrent ? "opacity-50 cursor-not-allowed" : "border-gray-300"
            }`}
          />
        </div>
      </div>

      <div className="flex items-center mb-4">
        <input
          id="isCurrent"
          name="isCurrent"
          type="checkbox"
          checked={form.isCurrent}
          onChange={handleChange}
          disabled={submitting}
          className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="isCurrent"
          className="select-none font-medium text-gray-700 dark:text-gray-300"
        >
          Currently working here
        </label>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          disabled={submitting}
          required
          maxLength={1000}
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="highlights"
          className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
        >
          Highlights (one per line)
        </label>
        <textarea
          id="highlights"
          name="highlights"
          rows={4}
          value={form.highlights}
          onChange={handleChange}
          disabled={submitting}
          placeholder="Enter one highlight per line..."
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="techStack"
          className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
        >
          Tech Stack (comma separated)
        </label>
        <input
          id="techStack"
          name="techStack"
          type="text"
          value={form.techStack}
          onChange={handleChange}
          disabled={submitting}
          placeholder="e.g. React, Node.js, MongoDB"
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={submitting}
          className={`px-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition`}
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditExperience;