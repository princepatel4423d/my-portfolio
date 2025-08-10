// controllers/projectControllers.js
import Project from "../models/projectModel.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    const data = req.body;

    // Validation for big projects
    if (data.type === "big") {
      if (!data.imageUrl) {
        return res.status(400).json({ error: "ImageUrl is required for big projects" });
      }
      if (!Array.isArray(data.stack) || data.stack.length === 0) {
        return res.status(400).json({ error: "Stack is required and should be an array for big projects" });
      }
    }

    const project = new Project(data);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all projects (optional filter by type)
export const getAllProject = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type && ["big", "small"].includes(req.query.type)) {
      filter.type = req.query.type;
    }
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update project by ID
export const updateProject = async (req, res) => {
  try {
    const data = req.body;

    // Validation for big projects on update
    if (data.type === "big") {
      if (!data.imageUrl) {
        return res.status(400).json({ error: "ImageUrl is required for big projects" });
      }
      if (!Array.isArray(data.stack) || data.stack.length === 0) {
        return res.status(400).json({ error: "Stack is required and should be an array for big projects" });
      }
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete project by ID
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
