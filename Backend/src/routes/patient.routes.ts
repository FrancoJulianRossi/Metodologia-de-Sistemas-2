import express from "express";
const patientController = require("../controllers/patient.controller.js");

const router = express.Router();

// CRUD Routes for Patient

// Create a new patient
// POST /api/patients
router.post("/", patientController.create);

// Get all patients
// GET /api/patients
router.get("/", patientController.getAll);

// Get patient by ID
// GET /api/patients/:id
router.get("/:id", patientController.getById);

// Get patient by DNI
// GET /api/patients/dni?dni=xxxxx
router.get("/dni", patientController.getByDni);

// Update patient
// PUT /api/patients/:id
router.put("/:id", patientController.update);

// Delete patient
// DELETE /api/patients/:id
router.delete("/:id", patientController.delete);

module.exports = router;
