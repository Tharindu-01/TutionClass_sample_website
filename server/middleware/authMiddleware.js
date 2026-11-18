
const jwt = require("jsonwebtoken");

function protectStudent(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Please login to continue",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "student") {
      return res.status(403).json({
        message: "Student access only",
      });
    }

    req.studentId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired session",
    });
  }
}

module.exports = protectStudent;
