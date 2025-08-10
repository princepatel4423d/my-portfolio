import React, { useState, useEffect, useContext } from "react";
import { Briefcase } from "@phosphor-icons/react";
import { AppContext } from "@/context/AppContext";
import { formatDate } from "@/utils/formatDate"; // adjust the path as needed

const Experience = () => {
  const { backendUrl } = useContext(AppContext);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${backendUrl}/api/experience/experiences`);
        if (!res.ok) throw new Error("Failed to fetch experiences");
        const data = await res.json();
        setExperiences(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [backendUrl]);

  if (loading)
    return (
      <section className="py-14 text-center text-gray-600 dark:text-gray-400 font-medium">
        Loading experiences...
      </section>
    );

  if (error)
    return (
      <section className="py-14 text-center text-red-600 dark:text-red-400 font-semibold">
        Error loading experiences: {error}
      </section>
    );

  if (!experiences.length)
    return (
      <section className="py-14 text-center text-gray-600 dark:text-gray-400 font-medium">
        No experiences found.
      </section>
    );

  return (
    <section className="py-14">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side - Title */}
        <div className="md:w-1/3 w-full">
          <h2 className="flex items-center gap-2 text-3xl font-medium">
            <Briefcase size={32} /> Experience
          </h2>
        </div>

        {/* Right Side - Experience Cards */}
        <div className="md:w-2/3 w-full flex flex-col gap-6">
          {experiences.map((exp, idx) => {
            const period =
              exp.startDate
                ? `${formatDate(exp.startDate)} - ${
                    exp.endDate ? formatDate(exp.endDate) : "Present"
                  }`
                : exp.period || "Dates not specified";

            return (
              <div
                key={exp._id || idx}
                className="w-full shadow-xs border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 hover:shadow-sm"
              >
                <div className="flex justify-between flex-wrap items-start mb-1">
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 italic">{period}</span>
                </div>

                <p className="text-base text-neutral-600 dark:text-neutral-400 mb-1">
                  {exp.company} • {exp.location || "Location not specified"}
                </p>

                <p className="text-neutral-700 dark:text-neutral-300 text-base mb-2">
                  {exp.description}
                </p>

                <div className="text-base mb-2">
                  <strong>Tech Stack:</strong>{" "}
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {Array.isArray(exp.stack || exp.techStack)
                      ? (exp.stack || exp.techStack).join(", ")
                      : "N/A"}
                  </span>
                </div>

                <ul className="list-disc list-inside space-y-1 text-base text-neutral-700 dark:text-neutral-300">
                  {(exp.achievements || exp.highlights || []).map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;