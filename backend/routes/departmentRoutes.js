
const express = require("express");
const Department = require("../models/Department");

const router = express.Router();

// GET: Retrieve all active departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true }).sort({
      name: 1,
    });

    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve departments",
    });
  }
});

// POST: Create a new department
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Department name is required",
      });
    }

    const department = await Department.create({
      name: name.trim(),
      description: description || "",
    });

    res.status(201).json(department);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This department already exists",
      });
    }

    res.status(500).json({
      message: "Failed to create department",
    });
  }
});

module.exports = router;
