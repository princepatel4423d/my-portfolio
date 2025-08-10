import React, { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { ToastContext } from "@/context/ToastContext";
import { useNavigate } from "react-router-dom";

const AddAcademic = () => {
  const { backendUrl } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    degree: "",
    institution: "",
    major: "",
    cgpa: "",
    startYear: "",
    endYear: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.degree.trim()) {
      addToast("Degree is required.", "error");
      return false;
    }
    if (!form.institution.trim()) {
      addToast("Institution is required.", "error");
      return false;
    }
    if (!form.startYear.trim()) {
      addToast("Start year is required.", "error");
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
      const res = await fetch(`${backendUrl}/api/academic/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to add academic record");
      }

      addToast("Academic record added!", "success");
      navigate("/academics");
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
      autoComplete="off"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Add Academic Record
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="degree">
            Degree <span className="text-red-600">*</span>
          </label>
          <input
            id="degree"
            name="degree"
            value={form.degree}
            onChange={handleChange}
            required
            maxLength={100}
            disabled={submitting}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. B.Tech, M.Sc, PhD, 12th"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="institution">
            Institution <span className="text-red-600">*</span>
          </label>
          <input
            id="institution"
            name="institution"
            value={form.institution}
            onChange={handleChange}
            required
            maxLength={150}
            disabled={submitting}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. IIT Bombay, XYZ High School"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="major">
            Major
          </label>
          <input
            id="major"
            name="major"
            value={form.major}
            onChange={handleChange}
            maxLength={100}
            disabled={submitting}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Computer Science"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="cgpa">
            CGPA / Percentage
          </label>
          <input
            id="cgpa"
            name="cgpa"
            value={form.cgpa}
            onChange={handleChange}
            maxLength={20}
            disabled={submitting}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 8.6, 92%"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium" htmlFor="startYear">
              Start Year <span className="text-red-600">*</span>
            </label>
            <input
              id="startYear"
              name="startYear"
              value={form.startYear}
              onChange={handleChange}
              required
              maxLength={10}
              disabled={submitting}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 2021"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium" htmlFor="endYear">
              End Year
            </label>
            <input
              id="endYear"
              name="endYear"
              value={form.endYear}
              onChange={handleChange}
              maxLength={10}
              disabled={submitting}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 2025 or Present"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            maxLength={500}
            disabled={submitting}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded shadow-sm dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Add any achievements, projects, or remarks"
          />
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {submitting ? "Saving..." : "Add Academic"}
        </button>
      </div>
    </form>
  );
};

export default AddAcademic;