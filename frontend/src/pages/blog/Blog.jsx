import React, { useState, useEffect, useContext } from "react";
import BlogCard from "./_components/BlogCard";
import { AppContext } from "@/context/AppContext";
import Banner from "@/components/common/Banner";

const Blog = () => {
  const { backendUrl } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [tagsList, setTagsList] = useState([]);

  // Load blogs from backend on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backendUrl}/api/blog/blogs`);
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [backendUrl]);

  // Fetch categories and tags
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          fetch(`${backendUrl}/api/blog/categories`),
          fetch(`${backendUrl}/api/blog/tags`)
        ]);

        if (!catRes.ok || !tagRes.ok) throw new Error("Failed to fetch categories/tags");

        const cats = await catRes.json();
        const tags = await tagRes.json();

        setCategories(cats);
        setTagsList(tags);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, [backendUrl]);

  return (
    <>
      <section className="max-w-4xl mx-auto text-center py-12">
        {/* Subheading */}
        <p className="uppercase text-sm tracking-widest text-neutral-600 dark:text-neutral-400 mb-2">
          The Blog
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal leading-tight mb-2">
          Words remembered, <br />
          within{" "}
          <span className="font-playfair bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text italic">
            the pensieve
          </span>
        </h1>

        {/* Description */}
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          A collection of my latest thoughts, tutorials, and stories — crafted to inspire, inform, and spark new ideas.
        </p>
      </section>

      <div className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Side - Blog List */}
          <div className="md:col-span-9">
            {loading && <p className="text-center text-gray-600">Loading blogs...</p>}
            {error && <p className="text-center text-red-600">Error: {error}</p>}
            {!loading && !error && blogs.length === 0 && (
              <p className="text-center text-gray-600">No blogs found.</p>
            )}
            {!loading &&
              !error &&
              blogs.map((post) => (
                <div key={post.slug}>
                  <BlogCard slug={post.slug} />
                  {post !== blogs[blogs.length - 1] && (
                    <hr className="my-4 border-gray-300 dark:border-neutral-700" />
                  )}
                </div>
              ))}
          </div>

          {/* Right Side - Category & Tag Box */}
          <div className="md:col-span-3">
            <div className="sticky top-20 space-y-6">
              {/* Categories */}
              <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((cat, idx) => (
                  <li
                    key={idx}
                    className="text-gray-700 dark:text-gray-300 text-sm"
                  >
                    {cat}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <h3 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tagsList.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Banner />
    </>
  );
};

export default Blog;