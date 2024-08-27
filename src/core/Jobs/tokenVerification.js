import { verifyToken } from '../Utils/jwtUtils.js';

export const checkTokenValidity = (token) => {
  try {
    const decoded = verifyToken(token);
    return !!decoded;
  } catch {
    return false;
  }
};
