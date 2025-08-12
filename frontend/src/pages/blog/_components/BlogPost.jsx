import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import { formatDate } from "@/utils/formatDate";
import { Clock, Tag } from "@phosphor-icons/react";
import { assets } from "@/assets/assets";

const BlogPost = () => {
  const { slug } = useParams();
  const { backendUrl } = useContext(AppContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Compute headings for Table of Contents unconditionally
  const headings = useMemo(() => {
    if (!post?.content) return [];
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = post.content;
    const headingElements = tempDiv.querySelectorAll("h2, h3");
    return Array.from(headingElements).map((heading) => {
      if (!heading.id) {
        heading.id = heading.textContent
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");
      }
      return {
        id: heading.id,
        text: heading.textContent,
        level: heading.tagName === "H2" ? 2 : 3,
      };
    });
  }, [post?.content]);

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
    return (
      <div className="text-center py-12 text-gray-600 dark:text-gray-400">
        Loading blog...
      </div>
    );
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

  const imageUrl =
    post.image && (post.image.startsWith("http") || post.image.startsWith("https"))
      ? post.image
      : `${backendUrl}/${post.image?.replace(/^\/+/, "")}`;

  return (
    <div className="flex flex-col lg:flex-row gap-6 py-6">
      {/* Blog Content - 80% */}
      <div className="w-full lg:w-[80%]">
        <article>
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold mb-3">{post.title}</h1>

          {/* Description */}
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-line">
            {post.description}
          </p>

          {/* TOC for Mobile */}
          <div className="my-6 block lg:hidden">
            <h2 className="font-semibold text-lg">Table of Contents</h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {headings.length === 0 && <li>No sections found</li>}
              {headings.map(({ id, text, level }) => (
                <li
                  key={id}
                  className={level === 3 ? "pl-4 list-disc list-inside" : ""}
                >
                  <a href={`#${id}`} className="hover:underline">
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Author Section */}
          <div className="flex items-center justify-between space-x-3 mb-6">
            <div className="flex items-center gap-3">
              <img
                src={assets.aboutImage}
                alt="Author"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex justify-start space-y-1 flex-col">
                <span className="font-medium">Prince Patel</span>
                <span className="text-neutral-800 dark:text-neutral-400 text-sm">
                  {formatDate(post.date)}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-1 text-sm">
              <div className="flex justify-end items-center gap-2">
                <span className="text-neutral-800 dark:text-neutral-400 text-sm">
                  {post.readTime} min read
                </span>
                <Clock size={18} weight="duotone" />
              </div>
              <div className="flex justify-end items-center gap-2">
                <span className="text-neutral-800 dark:text-neutral-400 text-sm">
                  {post.category}
                </span>
                <Tag size={18} weight="duotone" />
              </div>
            </div>
          </div>

          {/* Image */}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-2xl border mb-4"
            />
          )}

          {/* Full content */}
          {post.content && (
            <div
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
        </article>
      </div>

      {/* TOC for Desktop/Tablet */}
      <aside className="w-[20%] hidden lg:block">
        <div className="sticky top-20 space-y-3">
          <h2 className="font-semibold text-lg">Table of Contents</h2>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {headings.length === 0 && <li>No sections found</li>}
            {headings.map(({ id, text, level }) => (
              <li
                key={id}
                className={level === 3 ? "pl-4 list-disc list-inside" : ""}
              >
                <a href={`#${id}`} className="hover:underline">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default BlogPost;