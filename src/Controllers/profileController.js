import { createProfile, getProfile, updateProfile, deleteProfile } from '../core/Services/AuthService.js';

export const createProfileController = async (req, res) => {
  try {
    const profileData = req.body;
    const profile = await createProfile(profileData);
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.query.role; // Supondo que o papel seja passado como um parâmetro de consulta

    if (!role) {
      return res.status(400).json({ message: 'Role is required' });
    }

    const profile = await getProfile(id, role);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, ...updateData } = req.body;

    if (!role) {
      return res.status(400).json({ message: 'Role is required' });
    }

    const profile = await updateProfile(id, role, updateData);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.query.role;

    if (!role) {
      return res.status(400).json({ message: 'Role is required' });
    }

    const profile = await deleteProfile(id, role);
    res.json({ message: 'Profile deleted successfully', profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
