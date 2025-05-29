
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthenticated.' });
    }

    // Allow all roles if wildcard '*' is passed
    if (allowedRoles.includes('*') || allowedRoles.includes(req.user.role)) {
    // console.log(`User role ${req.user.role} is authorized.`);
      return next();
    }
    next();
  };
};

module.exports = authorizeRoles;
