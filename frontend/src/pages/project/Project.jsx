import React, { useContext, useEffect, useState } from "react";
import ProjectCard from "./_components/ProjectCards";
import { AppContext } from "@/context/AppContext";

const Project = () => {
  const { backendUrl } = useContext(AppContext);
  const [bigProjects, setBigProjects] = useState([]);
  const [smallProjects, setSmallProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backendUrl}/api/project/projects`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();

        setBigProjects(data.filter((p) => p.type === "big"));
        setSmallProjects(data.filter((p) => p.type === "small"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [backendUrl]);

  if (loading) {
    return (
      <section className="py-14 text-center text-gray-600 dark:text-gray-400 font-semibold">
        Loading Projects...
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-14 text-center text-red-600 dark:text-red-400 font-semibold">
        Error: {error}
      </section>
    );
  }

  return (
    <>
      <section className="text-center py-12">
        {/* Subheading */}
        <p className="uppercase text-sm tracking-widest text-neutral-600 dark:text-neutral-400 mb-2">
          My Work
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal leading-tight mb-2">
          Exploring <br />
          <span className="font-playfair bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 text-transparent bg-clip-text italic">
            creative projects
          </span>
        </h1>

        {/* Description */}
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          A showcase of my latest work, experiments, and ideas — each crafted with
          passion, detail, and dedication to delivering something unique.
        </p>
      </section>

      <div className="py-6">
        <h2 className="text-3xl font-medium text-center mb-6">Featured Projects</h2>
        {bigProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-20 justify-items-center">
            {bigProjects.map((project) => (
              <ProjectCard key={project._id} project={project} type="big" />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No big projects found.
          </p>
        )}

        <h2 className="text-3xl font-medium text-center mb-6">All Projects</h2>
        {smallProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {smallProjects.map((project) => (
              <ProjectCard key={project._id} project={project} type="small" />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No small projects found.
          </p>
        )}
      </div>
    </>
  );
};

export default Project;