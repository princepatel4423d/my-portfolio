import multer from 'multer';

// Configure storage to save files inside uploads folder with unique filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Make sure this folder exists (created by server code)
  },
  filename: (req, file, cb) => {
    // Prefix filename with timestamp + original name for uniqueness
    cb(null, Date.now() + '_' + file.originalname);
  }
});

// Accept image files only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer upload instance with limits
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

export default upload;