
const Enrollment = require("../models/Enrollment");

// IMPORTANT: Register Class model for populate()
require("../models/Class");

// GET /api/student/my-classes
const getMyClasses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.studentId,
      status: "active",
    })
      .populate({
        path: "class",
        match: { isActive: true },
      })
      .lean();

    const classes = enrollments
      .filter((enrollment) => enrollment.class)
      .map((enrollment) => ({
        ...enrollment.class,
        enrollmentId: enrollment._id,
        enrolledAt: enrollment.enrolledAt,
      }));

    return res.status(200).json({
      success: true,
      count: classes.length,
      classes,
    });
  } catch (error) {
    console.error("GET MY CLASSES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load enrolled classes",
    });
  }
};

// GET /api/student/my-timetable
const getMyTimetable = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.studentId,
      status: "active",
    })
      .populate({
        path: "class",
        match: { isActive: true },
      })
      .lean();

    const timetable = [];

    for (const enrollment of enrollments) {
      const classData = enrollment.class;

      if (!classData) continue;

      for (const session of classData.schedule || []) {
        timetable.push({
          classId: classData._id,
          classCode: classData.classCode,
          subject: classData.subject,
          teacherName: classData.teacherName,
          teacherPhone: classData.teacherPhone,
          mode: classData.mode,
          hallNumber: classData.hallNumber,
          day: session.day,
          startTime: session.startTime,
          endTime: session.endTime,
        });
      }
    }

    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    timetable.sort((a, b) => {
      const dayDifference =
        days.indexOf(a.day) -
        days.indexOf(b.day);

      if (dayDifference !== 0) {
        return dayDifference;
      }

      return a.startTime.localeCompare(
        b.startTime
      );
    });

    return res.status(200).json({
      success: true,
      count: timetable.length,
      timetable,
    });
  } catch (error) {
    console.error("GET MY TIMETABLE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load timetable",
    });
  }
};

module.exports = {
  getMyClasses,
  getMyTimetable,
};
