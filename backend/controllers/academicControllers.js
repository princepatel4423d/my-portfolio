import Academic from '../models/academicModel.js';

// Create a new academic record
export const createAcademic = async (req, res) => {
  try {
    const data = req.body;
    const academic = new Academic(data);
    const saved = await academic.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all academic records
export const getAllAcademic = async (req, res) => {
  try {
    // Sorted by startYear ascending, then descending createdAt (customize as needed)
    const academics = await Academic.find().sort({ startYear: 1, createdAt: -1 });
    res.json(academics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one academic record by ID
export const getAcademicById = async (req, res) => {
  try {
    const academic = await Academic.findById(req.params.id);
    if (!academic) return res.status(404).json({ error: 'Not found' });
    res.json(academic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing academic record
export const updateAcademic = async (req, res) => {
  try {
    const updated = await Academic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an academic record
export const deleteAcademic = async (req, res) => {
  try {
    const deleted = await Academic.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Academic deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
