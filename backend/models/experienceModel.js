import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  description: String,
  startDate: Date,
  endDate: Date,   // null or undefined if "Present"
  techStack: [String], // e.g. ['React', 'Node.js']
  highlights: [String], // bullets
  order: { type: Number, default: 0 } // for admin drag-ordering, optional
},
{ timestamps: true }
);

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;