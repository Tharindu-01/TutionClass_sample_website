
const express = require("express");
const multer = require("multer");
const Student = require("../models/Student");
const protectStudent = require("../middleware/authMiddleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error(
        "Only JPG, PNG and WEBP images are allowed"
      ));
    }

    cb(null, true);
  },
});

// Validate the actual file signature
function isValidImage(buffer, type) {
  if (!buffer || buffer.length < 12) return false;

  if (type === "image/jpeg") {
    return (
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff
    );
  }

  if (type === "image/png") {
    return (
      buffer.subarray(0, 8).equals(
        Buffer.from([
          137, 80, 78, 71, 13, 10, 26, 10,
        ])
      )
    );
  }

  if (type === "image/webp") {
    return (
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP"
    );
  }

  return false;
}

// GET logged-in student details
router.get("/me", protectStudent, async (req, res) => {
  try {
    const student = await Student.findById(
      req.studentId
    ).select(
      "name email grade registrationNumber createdAt profilePhoto.contentType"
    );

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        grade: student.grade,
        registrationNumber: student.registrationNumber,
        joinedAt: student.createdAt,
        hasPhoto: Boolean(
          student.profilePhoto?.contentType
        ),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to load student profile",
    });
  }
});

// GET profile photo
router.get(
  "/me/photo",
  protectStudent,
  async (req, res) => {
    try {
      const student = await Student.findById(
        req.studentId
      ).select(
        "+profilePhoto.data +profilePhoto.contentType"
      );

      if (!student?.profilePhoto?.data) {
        return res.status(404).json({
          message: "Profile photo not found",
        });
      }

      res.set("Content-Type",
        student.profilePhoto.contentType
      );
      res.set("Cache-Control", "no-store");
      res.set("X-Content-Type-Options", "nosniff");

      res.send(student.profilePhoto.data);
    } catch (error) {
      res.status(500).json({
        message: "Unable to load profile photo",
      });
    }
  }
);

// Upload profile photo
router.post(
  "/me/photo",
  protectStudent,
  (req, res, next) => {
    upload.single("photo")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "Please select an image",
        });
      }

      if (
        !isValidImage(
          req.file.buffer,
          req.file.mimetype
        )
      ) {
        return res.status(400).json({
          message: "Invalid image file",
        });
      }

      const student = await Student.findById(
        req.studentId
      );

      if (!student) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      student.profilePhoto = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };

      await student.save();

      res.json({
        message: "Profile photo updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Unable to upload photo",
      });
    }
  }
);

// Remove profile photo
router.delete(
  "/me/photo",
  protectStudent,
  async (req, res) => {
    try {
      const student = await Student.findById(
        req.studentId
      );

      if (!student) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      student.profilePhoto = undefined;
      await student.save();

      res.json({
        message: "Profile photo removed",
      });
    } catch (error) {
      res.status(500).json({
        message: "Unable to remove photo",
      });
    }
  }
);

module.exports = router;
