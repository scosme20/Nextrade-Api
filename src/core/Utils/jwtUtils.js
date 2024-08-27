import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const { id, role } = user;
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
