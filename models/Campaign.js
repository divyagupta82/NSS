const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true }, // URL or path for the uploaded image
  description: { type: String, required: true },
  target: { type: Number, required: true }, // Target amount for the campaign
  raised: { type: Number, default: 0 }, // Amount raised so far
  progress: { type: Number, default: 0 }, // Progress percentage, calculated if necessary
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Campaign', campaignSchema);