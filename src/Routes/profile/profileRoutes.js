import express from 'express';
import { 
  createProfileController, 
  getProfileController, 
  updateProfileController, 
  deleteProfileController 
} from '../../Controllers/profileController.js';

const router = express.Router();

router.post('/profile', createProfileController);

router.get('/profile/:id', getProfileController);

router.put('/profile/:id', updateProfileController);

router.delete('/profile/:id', deleteProfileController);

export default router;
