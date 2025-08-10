// routes/academicRoutes.js
import express from "express";
import {
  createAcademic,
  getAllAcademic,
  getAcademicById,
  updateAcademic,
  deleteAcademic,
} from "../controllers/academicControllers.js";

const academicRouter = express.Router();

// Get all academic records
academicRouter.get("/academics", getAllAcademic);

// Get a single academic record by ID
academicRouter.get("/:id", getAcademicById);

// Create a new academic record
academicRouter.post("/create", createAcademic);

// Update an academic record by ID
academicRouter.put("/update/:id", updateAcademic);

// Delete an academic record by ID
academicRouter.delete("/delete/:id", deleteAcademic);

export default academicRouter;