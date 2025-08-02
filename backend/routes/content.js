// routes/content.js
const express = require('express');
const router = express.Router();
const Content = require('../models/content');

// POST: Create new content request
router.post('/', async (req, res) => {
  try {
    const newContent = new Content(req.body);
    const savedContent = await newContent.save();
    res.status(201).json(savedContent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Get all content requests
router.get('/', async (req, res) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 }); //Sorts them in descending order by createdAt (latest first).
    res.json(contents); //Return the contents to client as json data
  } catch (err) {
    res.status(500).json({ error: err.message });
  }                         //error message with status code 500 (server error).
});

module.exports = router;
