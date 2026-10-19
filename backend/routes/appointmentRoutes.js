
const express = require("express");
const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

const router = express.Router();

// GET: Retrieve all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name specialization")
      .populate("department", "name")
      .sort({ appointmentDate: 1, tokenNumber: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve appointments",
    });
  }
});

// POST: Book an appointment
router.post("/", async (req, res) => {
  try {
    const {
      patientName,
      patientPhone,
      doctor: doctorId,
      appointmentDate,
    } = req.body;

    if (
      typeof patientName !== "string" ||
      !patientName.trim() ||
      typeof patientPhone !== "string" ||
      !patientPhone.trim() ||
      !doctorId ||
      !appointmentDate
    ) {
      return res.status(400).json({
        message:
          "Patient name, phone, doctor, and appointment date are required",
      });
    }

    if (!mongoose.isValidObjectId(doctorId)) {
      return res.status(400).json({
        message: "Invalid doctor ID",
      });
    }

    const date = new Date(appointmentDate);

    if (Number.isNaN(date.getTime())) {
      return res.status(400).json({
        message: "Invalid appointment date",
      });
    }

    if (date < new Date()) {
      return res.status(400).json({
        message: "Appointment date must be in the future",
      });
    }

    const selectedDoctor = await Doctor.findOne({
      _id: doctorId,
      isActive: true,
    });

    if (!selectedDoctor) {
      return res.status(404).json({
        message: "Active doctor not found",
      });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const lastAppointment = await Appointment.findOne({
      doctor: selectedDoctor._id,
      appointmentDate: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ tokenNumber: -1 });

    const tokenNumber = lastAppointment
      ? lastAppointment.tokenNumber + 1
      : 1;

    const appointment = await Appointment.create({
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      doctor: selectedDoctor._id,
      department: selectedDoctor.department,
      appointmentDate: date,
      tokenNumber,
    });

    const savedAppointment = await appointment.populate([
      { path: "doctor", select: "name specialization" },
      { path: "department", select: "name" },
    ]);

    res.status(201).json(savedAppointment);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid appointment details",
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Token conflict. Please try booking again.",
      });
    }

    res.status(500).json({
      message: "Failed to book appointment",
    });
  }
});

module.exports = router;
