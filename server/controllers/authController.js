
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Student = require("../models/Student");
const EligibleStudent = require("../models/EligibleStudent");

function createToken(student) {
  return jwt.sign(
    {
      id: student._id,
      role: "student",
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
}

// REGISTER STUDENT
exports.register = async (req, res) => {
  try {
    const { registrationNumber, name, email, password } =
      req.body;

    if (
      !registrationNumber ||
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must have at least 8 characters",
      });
    }

    const regNo = registrationNumber.trim().toUpperCase();
    const normalizedEmail = email.trim().toLowerCase();

    const eligible = await EligibleStudent.findOne({
      registrationNumber: regNo,
      isUsed: false,
    });

    if (!eligible) {
      return res.status(403).json({
        message: "Invalid or already used registration number",
      });
    }

    const existing = await Student.findOne({
      $or: [
        { email: normalizedEmail },
        { registrationNumber: regNo },
      ],
    });

    if (existing) {
      return res.status(409).json({
        message: "Student account already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const student = await Student.create({
      registrationNumber: regNo,
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      grade: eligible.grade,
    });

    await EligibleStudent.updateOne(
      { _id: eligible._id },
      { $set: { isUsed: true } }
    );

    res.status(201).json({
      message: "Registration successful",
      token: createToken(student),
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        grade: student.grade,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);

    res.status(500).json({
      message: "Registration failed",
    });
  }
};

// LOGIN STUDENT
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const student = await Student.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (
      !student ||
      !(await bcrypt.compare(password, student.password))
    ) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      message: "Login successful",
      token: createToken(student),
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        grade: student.grade,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      message: "Login failed",
    });
  }
};
