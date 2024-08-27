import jwt from 'jsonwebtoken';
import { getUserByRole } from '../Services/AuthService.js';

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserByRole(decoded.id, decoded.role);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;  
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
