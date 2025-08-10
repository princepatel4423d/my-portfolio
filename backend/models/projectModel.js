// models/projectModel.js
import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["big", "small"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "",
      trim: true,
    },
    stack: {
      type: [String], // Array of tech stack strings (big projects)
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    sourceUrl: {
      type: String,
      default: "",
      trim: true,
    },
    demoUrl: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);