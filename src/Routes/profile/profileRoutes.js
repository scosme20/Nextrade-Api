import express from 'express';
import { 
  createProfileController, 
  getProfileController, 
  updateProfileController, 
  deleteProfileController 
} from '../../Controllers/profileController.js';

const router = express.Router();

router.post('/', createProfileController);

router.get('/:id', getProfileController);

router.put('/:id', updateProfileController);

router.delete('/:id', deleteProfileController);

export default router;
