import Admin from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT Token
const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.ADMIN_JWT_SECRET, { expiresIn: "7d" });
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await Admin.findOne({ email })) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = await Admin.create({ name, email, password });

    const token = generateToken(newAdmin._id);

    res.status(201).json({
      message: "Admin registered successfully",
      admin: { id: newAdmin._id, name: newAdmin.name, email: newAdmin.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(admin._id);

    res.status(200).json({
      message: "Login successful",
      admin: { id: admin._id, name: admin.name, email: admin.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutAdmin = async (req, res) => {
  // Since JWT is stateless, the server only informs client to delete token
  res.status(200).json({ message: "Logout successful" });
};

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.adminId).select("name email createdAt");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetAdminPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.user.adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.matchPassword(oldPassword);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
