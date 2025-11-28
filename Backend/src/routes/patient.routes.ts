import express from "express";
const patientController = require("../controllers/patient.controller.js");

// Rutas CRUD para pacientes
// Montadas en /api/patients desde app.ts
const router = express.Router();

// POST /api/patients - crear paciente
router.post("/", patientController.create);

// GET /api/patients - listar pacientes
router.get("/", patientController.getAll);

// GET /api/patients/:id - obtener paciente por ID
router.get("/:id", patientController.getById);

// GET /api/patients/dni/:dni - obtener paciente por DNI
router.get("/dni/:dni", patientController.getByDni);

// PUT /api/patients/:id - actualizar paciente
router.put("/:id", patientController.update);

// DELETE /api/patients/:id - eliminar paciente
router.delete("/:id", patientController.delete);

module.exports = router;
