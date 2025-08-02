const express = require('express');  //Framework to build APIs
const mongoose = require('mongoose'); //Connects your app to MongoDB
const cors = require('cors'); //Allows your backend to accept requests from a different domain
require('dotenv').config(); //Lets you use .env file to hide sensitive info (like DB password, JWT secret)

const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content'); // add this

const app = express(); //Starts your Express application — like creating your backend server.

app.use(cors());  //	Allows frontend (like React app on different port) to talk to backend
app.use(express.json()); //	Parses JSON body in incoming requests (so you can use req.body)

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes); // add this

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



const path = require("path");

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
