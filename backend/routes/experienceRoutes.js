import express from 'express';
import {
  createExperience,
  getAllExperience,
  getExperienceById,
  updateExperience,
  deleteExperience,
} from '../controllers/experienceControllers.js';

const experienceRouter = express.Router();

experienceRouter.get('/experiences', getAllExperience);
experienceRouter.get('/:id', getExperienceById);
experienceRouter.post('/create', createExperience);
experienceRouter.put('/update/:id', updateExperience);
experienceRouter.delete('/delete/:id', deleteExperience);

export default experienceRouter;