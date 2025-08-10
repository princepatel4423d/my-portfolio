import express from 'express';
import upload from '../middleware/upload.js';
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlogBySlug,
  getLatestBlog,
  getAllCategories,
  getAllTags,
} from '../controllers/blogControllers.js';

const blogRouter = express.Router();

// Fetch all blogs
blogRouter.get('/blogs', getAllBlogs);

// fetch latest blog
blogRouter.get('/latest', getLatestBlog);

// Fetch a single blog by slug (SEO-friendly URL)
blogRouter.get('/slug/:slug', getBlogBySlug);

// Create a blog with image upload
blogRouter.post('/create', upload.single('image'), createBlog);

// Update a blog by ID, with optional new image upload
blogRouter.put('/update/:slug', upload.single('image'), updateBlog);

// Delete a blog by ID
blogRouter.delete('/delete/:slug', deleteBlog);

// Fetch all categories
blogRouter.get('/categories', getAllCategories)

// Fetch all Tags
blogRouter.get('/tags', getAllTags)

export default blogRouter;