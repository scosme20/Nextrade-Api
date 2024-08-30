import { register, login } from '../core/Services/AuthService.js';

export const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const { token, user } = await register(userData);
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role, identifier } = req.body;
    const { token, user } = await login(email, password, role, identifier);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
