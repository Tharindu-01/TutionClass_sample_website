
const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    classCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    grade: {
      type: Number,
      required: true,
      enum: [10, 11],
    },

    teacherName: {
      type: String,
      required: true,
      trim: true,
    },

    teacherPhone: {
      type: String,
      default: "",
    },

    mode: {
      type: String,
      enum: ["Physical", "Online", "Hybrid"],
      default: "Physical",
    },

    hallNumber: {
      type: String,
      default: "",
    },

    schedule: [
      {
        day: {
          type: String,
          required: true,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },

        startTime: {
          type: String,
          required: true,
        },

        endTime: {
          type: String,
          required: true,
        },
      },
    ],

    description: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Class", classSchema);
