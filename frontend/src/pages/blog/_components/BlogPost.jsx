import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { formatDate } from "@/utils/formatDate";

const BlogPost = () => {
  const { slug } = useParams();
  const { backendUrl } = useContext(AppContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setError("No blog slug provided.");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backendUrl}/api/blog/slug/${slug}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch blog: ${res.statusText}`);
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, backendUrl]);

  if (loading) {
    return <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading blog...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600 dark:text-red-400 font-semibold">
        {error}
      </div>
    );
  }

  if (!post) {
    return null;
  }

  // Resolve full image URL
  const imageUrl =
    post.image && (post.image.startsWith("http") || post.image.startsWith("https"))
      ? post.image
      : `${backendUrl}/${post.image?.replace(/^\/+/, "")}`; // Avoid duplicate slashes

  return (
    <article>
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

      {/* Description */}
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line">{post.description}</p>

      {/* Date, Category, and Read time */}
      <div className="flex flex-wrap items-center gap-6 text-neutral-600 dark:text-neutral-400 text-sm mb-6">
        <div>
          <strong className="mr-1">Date:</strong>
          {formatDate(post.date)}
        </div>
        <div>
          <strong className="mr-1">Category:</strong>
          {post.category}
        </div>
        <div>
          <strong className="mr-1">Read Time:</strong>
          {post.readTime} min read
        </div>
      </div>

      {/* Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title}
          className="w-full h-auto max-h-[500px] object-cover rounded-md mb-6"
        />
      )}

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-200 dark:bg-gray-800 text-neutral-600 dark:text-neutral-400 px-3 py-1 rounded-full text-sm font-semibold"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Full content */}
      {post.content && (
        <div
          className="prose prose-sm max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}
    </article>
  );
};

export default BlogPost;