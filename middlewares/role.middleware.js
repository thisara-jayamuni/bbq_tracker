
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthenticated.' });
    }


    if (allowedRoles.includes('*') || allowedRoles.includes(req.user.role)) {
    // console.log(`User role ${req.user.role} is authorized.`);
      return next();
    }
    next();
  };
};

module.exports = authorizeRoles;
