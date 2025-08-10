import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { AppContext } from '@/context/AppContext';
import { ToastContext } from '@/context/ToastContext';

const EditBlog = () => {
  const { slug } = useParams(); // Use slug, not id
  const { backendUrl, isLoggedin } = useContext(AppContext);
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const editor = useRef(null);

  // Form state variables
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [readTime, setReadTime] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Memoized Jodit Editor config to prevent re-instantiation
  const editorConfig = useMemo(() => ({
    readonly: false,
    height: 400,
    toolbarSticky: false,
  }), []);

  // Fetch blog data by slug to prefill fields on mount or slug change
  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/blog/slug/${slug}`);
        const blog = res.data;

        setTitle(blog.title || '');
        setDescription(blog.description || '');
        setContent(blog.content || '');
        setReadTime(blog.readTime || '');
        setCategory(blog.category || '');
        setTags(Array.isArray(blog.tags) ? blog.tags.join(', ') : '');
      } catch (error) {
        addToast(error.response?.data?.error || error.message || 'Failed to fetch blog', 'error');
      }
    };

    fetchBlog();
  }, [backendUrl, slug, addToast]);

  // Parse tags input to array, max 5 tags
  const parseTags = (tagsString) =>
    tagsString
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .slice(0, 5);

  // Image file input change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        addToast('Please select a valid image file', 'error');
        return;
      }
      setImage(file);
    }
  };

  // Handle form submission to update blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedin) {
      addToast('You must be logged in to update a blog', 'error');
      return;
    }

    if (!title || !description || !content || !readTime || !category) {
      addToast('Please fill in all required fields', 'error');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('content', content);
      formData.append('readTime', readTime);
      formData.append('category', category);

      const tagsArray = parseTags(tags);
      tagsArray.forEach((tag) => formData.append('tags[]', tag));

      if (image) {
        formData.append('image', image);
      }

      const token = localStorage.getItem('adminToken');

      await axios.put(`${backendUrl}/api/blog/update/${slug}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      addToast('Blog updated successfully!', 'success');
      navigate('/blogs');
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'Failed to update blog';
      addToast(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Blog</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
            Title <span className="text-red-600">*</span>:
          </label>
          <input
            id="title"
            type="text"
            maxLength={200}
            required
            disabled={submitting}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
            Description <span className="text-red-600">*</span>:
          </label>
          <textarea
            id="description"
            maxLength={500}
            required
            disabled={submitting}
            value={description}
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block font-medium text-gray-700 mb-1">
            Content <span className="text-red-600">*</span>:
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)}
            config={editorConfig}
            tabIndex={1}
            className="border border-gray-300 rounded"
          />
        </div>

        {/* Read Time */}
        <div>
          <label htmlFor="readTime" className="block font-medium text-gray-700 mb-1">
            Read Time <span className="text-red-600">*</span> (e.g., "5 min read"):
          </label>
          <input
            id="readTime"
            type="text"
            required
            disabled={submitting}
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block font-medium text-gray-700 mb-1">
            Category <span className="text-red-600">*</span>:
          </label>
          <input
            id="category"
            type="text"
            required
            disabled={submitting}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block font-medium text-gray-700 mb-1">
            Tags (comma separated, max 5):
          </label>
          <input
            id="tags"
            type="text"
            disabled={submitting}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. react, javascript, programming"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image upload */}
        <div>
          <label htmlFor="image" className="block font-medium text-gray-700 mb-1">
            Update Image (optional):
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            disabled={submitting}
            onChange={handleImageChange}
            className="block"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 rounded text-white font-semibold transition ${
            submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {submitting ? 'Updating...' : 'Update Blog'}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;