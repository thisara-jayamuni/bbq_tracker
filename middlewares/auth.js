module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid Authorization header" });
    }
  
    const token = authHeader.split(" ")[1];
  
    if (token !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ error: "Forbidden: Invalid API key" });
    }
  
    next();
  };