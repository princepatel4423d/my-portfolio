import mongoose from 'mongoose';
import slugify from 'slugify';

function arrayLimit(val) {
  return val.length <= 5;
}

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String // URL or path of the image
  },
  date: {
    type: Date,
    default: Date.now
  },
  readTime: {
    type: String, // e.g., "5 min read"
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
    default: []
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

// Pre-validate hook to generate slug from title
blogSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true, trim: true });
  }
  next();
});

export default mongoose.model('Blog', blogSchema);