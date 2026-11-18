
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    grade: {
      type: Number,
      enum: [10, 11],
      required: true,
    },

    role: {
      type: String,
      default: "student",
      immutable: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
