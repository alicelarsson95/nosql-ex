// Middleware som tillåter endast användare med admin-roll att fortsätta
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Only admins are allowed to perform this action." });
  }
};
