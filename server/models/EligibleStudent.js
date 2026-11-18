
const mongoose = require("mongoose");

const eligibleStudentSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  grade: {
    type: Number,
    enum: [10, 11],
    required: true,
  },

  isUsed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model(
  "EligibleStudent",
  eligibleStudentSchema
);
