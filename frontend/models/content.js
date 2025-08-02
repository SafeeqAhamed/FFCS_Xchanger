const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true }, // 🔹 added
  subject: { type: String, required: true },
  currentFaculty: { type: String, required: true },
  currentSlot: { type: String, required: true },
  desiredFaculty: { type: String, required: true },
  desiredSlot: { type: String, required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model('Content', contentSchema);
