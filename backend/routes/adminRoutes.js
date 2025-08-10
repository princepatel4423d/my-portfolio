import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  resetAdminPassword,
} from "../controllers/adminControllers.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logoutAdmin);
adminRouter.get("/profile", adminAuth, getAdminProfile);
adminRouter.post("/reset-password", adminAuth, resetAdminPassword);

export default adminRouter;