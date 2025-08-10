import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/formatDate";
import { CalendarDots, Clock } from "@phosphor-icons/react";
import { AppContext } from "@/context/AppContext";

const BlogCard = ({ slug }) => {
  const { backendUrl } = useContext(AppContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setError("No blog slug provided");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${backendUrl}/api/blog/slug/${slug}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch blog: ${response.statusText}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, backendUrl]);

  if (loading) {
    return (
      <div className="text-center py-8 text-gray-600 dark:text-gray-400">
        Loading post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const { title, description, date, readTime, tags = [], image } = post;

  // Construct absolute image URL in case of relative path
  const imageUrl = image
    ? image.startsWith("http") || image.startsWith("https")
      ? image
      : `${backendUrl}/${image.replace(/^\/+/, "")}`
    : null;

  return (
    <Link to={`/blog/post/${slug}`} className="flex flex-col md:flex-row md:items-center gap-4 mb-8 p-0 sm:p-2">
      {/* Left - Content */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-2">
            <CalendarDots size={18} />
            {formatDate(date)}
          </p>
          {/* Wrap title inside Link for navigation */}
          <div className="text-2xl font-semibold mb-2 text-neutral-700 dark:text-white hover:text-neutral-950">
            {title}
          </div>
          <p className="text-base text-gray-700 dark:text-gray-300">{description}</p>
        </div>
        <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 dark:text-gray-400 gap-y-2">
          <span className="flex items-center gap-2">
            <Clock size={18} />
            {readTime} min read
          </span>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Image */}
      {imageUrl && (
        <div className="w-full md:w-64 h-48 sm:h-40 flex-shrink-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
    </Link>
  );
};

export default BlogCard;
