const userService = require('../services/users.service');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide email and password' });
    }

    // Find user by email using the service
    const user = await userService.getByEmail(email);
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Get full user document with password for comparison
    const fullUser = await User.findOne({ email });
    console.log('Full user found:', fullUser ? 'Yes' : 'No');

    if (!fullUser) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await fullUser.comparePassword(password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name || '',
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response in the requested format
    res.status(200).json({
      token,
      userData: {
        id: user._id,
        name: user.name || '',
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
};
