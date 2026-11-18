
const express = require("express");

const {
  getMyClasses,
  getMyTimetable,
} = require("../controllers/studentClassController");

const protectStudent = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/my-classes",
  protectStudent,
  getMyClasses
);

router.get(
  "/my-timetable",
  protectStudent,
  getMyTimetable
);

module.exports = router;
