import jwt from 'jsonwebtoken';

// Skapar en JWT-token baserat på användarens ID och roll
export const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};
