import React, { useContext } from "react";
import { GithubLogo, LinkSimple } from "@phosphor-icons/react";
import { AppContext } from "@/context/AppContext";

const ProjectCards = ({ project, type }) => {
    const { backendUrl } = useContext(AppContext);

    // Unified field handling for both project types
    const imageUrl = project.imageUrl || project.image || "";
    const getImage = () =>
        !imageUrl
            ? ""
            : imageUrl.startsWith("http")
                ? imageUrl
                : `${backendUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;

    const stack = Array.isArray(project.stack) ? project.stack : [];
    const tags = Array.isArray(project.tags) ? project.tags : [];
    const source = project.sourceUrl || project.source || "";
    const demo = project.demoUrl || project.demo || "";

    if (type === "big") {
        return (
            <div className="flex flex-col rounded-4xl shadow-lg border overflow-hidden mb-6 bg-white dark:bg-neutral-900 transition-shadow hover:shadow-xl w-full max-w-2xl">
                {getImage() && (
                    <img
                        src={getImage()}
                        alt={project.title}
                        className="w-full h-64 object-cover rounded-t-4xl"
                        loading="lazy"
                    />
                )}

                <div className="flex flex-col flex-grow p-6">
                    <div className="flex flex-col flex-grow">
                        <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                            {project.title}
                        </h3>
                        {stack.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {stack.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-xs bg-gray-200 dark:bg-gray-700 rounded-lg px-2 py-1 select-none"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                        <p className="text-neutral-700 dark:text-neutral-300 mb-2 leading-relaxed">
                            {project.description}
                        </p>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-sm text-black dark:text-gray-200 select-none"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        {source && (
                            <a
                                href={source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-neutral-200 text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition"
                                aria-label="Source Code"
                            >
                                <GithubLogo size={16} />
                                Source
                            </a>
                        )}
                        {demo && (
                            <a
                                href={demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
                                aria-label="Live Demo"
                            >
                                <LinkSimple size={16} />
                                Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Small card (no image, vertical layout)
    return (
        <div className="flex flex-col rounded-3xl shadow-md overflow-hidden p-6 border mb-6 bg-white dark:bg-neutral-900 hover:shadow-lg transition-shadow cursor-pointer max-w-sm h-full">
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                    {project.title}
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3 leading-relaxed">
                    {project.description}
                </p>
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-sm text-black dark:text-gray-200 select-none"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex justify-center gap-3">
                {source && (
                    <a
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-neutral-200 text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 transition"
                        aria-label="Source Code"
                    >
                        <GithubLogo size={16} />
                        Source
                    </a>
                )}
                {demo && (
                    <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition"
                        aria-label="Live Demo"
                    >
                        <LinkSimple size={16} />
                        Demo
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectCards;