import Experience from '../models/experienceModel.js';

// Create
export const createExperience = async (req, res) => {
  try {
    const data = req.body;
    const experience = new Experience(data);
    const saved = await experience.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
export const getAllExperience = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, startDate: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ error: 'Not found' });
    res.json(experience);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update
export const updateExperience = async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
export const deleteExperience = async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Experience deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
