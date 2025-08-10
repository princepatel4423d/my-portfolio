// Using ES Module export
import mongoose from "mongoose";

const academicSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  major: String,
  cgpa: String,
  startYear: String,
  endYear: String,
  notes: String,
}, { timestamps: true });

export default mongoose.model("Academic", academicSchema);