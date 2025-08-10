import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';        // MongoDB connection function
import adminRouter from './routes/adminRoutes.js';  // admin routes
import blogRouter from './routes/blogRoutes.js';    // blog routes
import experienceRouter from './routes/experienceRoutes.js'; // experience routes
import academicRouter from './routes/academicRoutes.js'; // academic routes
import projectRouter from './routes/projectRoutes.js'; // project routes

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 5000;

// -- Ensure uploads folder exists --
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created uploads directory at ${uploadDir}`);
}

// Connect to MongoDB
connectDB();

// Allowed CORS origins
const allowedOrigins = [
  'https://my-portfolio-frontend-lb9d.onrender.com',
  'https://my-portfolio-admin-gyjw.onrender.com'
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Serve uploads folder statically
app.use('/uploads', express.static(uploadDir));

// Basic test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// API routes
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/academic', academicRouter);
app.use('/api/project', projectRouter);

// Global error handler with Multer error detection
import multer from 'multer';  // Import multer to check error type

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof multer.MulterError) {
    // Multer-specific errors (file too large, invalid file, etc.)
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: 'An unexpected error occurred!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
