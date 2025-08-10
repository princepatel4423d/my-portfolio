// routes/projectRoutes.js
import express from "express";
import {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectControllers.js";

const projectRouter = express.Router();

// Get all projects, optional query param: ?type=big|small
projectRouter.get("/projects", getAllProject);

// Get one project by ID
projectRouter.get("/:id", getProjectById);

// Create new project
projectRouter.post("/create", createProject);

// Update project by ID
projectRouter.put("/update/:id", updateProject);

// Delete project by ID
projectRouter.delete("/delete/:id", deleteProject);

export default projectRouter;