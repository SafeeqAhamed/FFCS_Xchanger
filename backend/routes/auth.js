const express = require('express');
const bcrypt = require('bcryptjs'); //Used to hash passwords
const jwt = require('jsonwebtoken'); //Used to generate secure login tokens.
const User = require('../models/User');   //Mongoose model for the users collection in MongoDB.

const router = express.Router(); //separate router (like a mini app) for authentication-related routes.

// 🔐 Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key'; // You can move this to .env

// REGISTER 
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email.endsWith('@vitstudent.ac.in')) {
    return res.status(400).json({ error: 'Only VIT students allowed' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });  //Creates a new User object
    await user.save();  //Saves the user to the database. to collection users in MongoDB.
    res.json({ message: 'User registered' });
  } catch (err) {              //Catches errors like duplicate email-we set it as unique.
    res.status(400).json({ error: 'Email already exists or invalid' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {  // When a POST request is sent to /login, this function will run.
  const { email, password } = req.body; 

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
