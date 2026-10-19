
const express = require("express");
const Doctor = require("../models/Doctor");
const Department = require("../models/Department");

const router = express.Router();

// GET: Retrieve all active doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find({ isActive: true })
      .populate("department", "name")
      .sort({ name: 1 });

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve doctors",
    });
  }
});

// POST: Create a new doctor
router.post("/", async (req, res) => {
  try {
    const {
      name,
      department,
      specialization,
      consultationDuration,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Doctor name is required",
      });
    }

    if (!department) {
      return res.status(400).json({
        message: "Department is required",
      });
    }

    if (!specialization || !specialization.trim()) {
      return res.status(400).json({
        message: "Specialization is required",
      });
    }

    const departmentExists = await Department.findOne({
      _id: department,
      isActive: true,
    });

    if (!departmentExists) {
      return res.status(400).json({
        message: "Selected department does not exist or is inactive",
      });
    }

    const doctor = await Doctor.create({
      name: name.trim(),
      department,
      specialization: specialization.trim(),
      consultationDuration,
    });

    const savedDoctor = await doctor.populate("department", "name");

    res.status(201).json(savedDoctor);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid doctor details",
      });
    }

    res.status(500).json({
      message: "Failed to create doctor",
    });
  }
});

module.exports = router;
