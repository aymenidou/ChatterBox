const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');

// register the user
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // check if it exist
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // check if it exist
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    // matching the passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    // respond with a connection token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update user information
exports.updateUser = async (req, res) => {
  const { username, bio } = req.body;

  try {
    // Find the user by ID (assume the user ID is in the token)
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user information
    user.username = username || user.username;
    user.bio = bio || user.bio;

    await user.save();

    res.json({ message: 'User information updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};