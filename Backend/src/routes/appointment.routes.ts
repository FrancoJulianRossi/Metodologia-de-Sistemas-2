import express from "express";
const appointmentController = require("../controllers/appointment.controller");

const router = express.Router();

// usar los métodos existentes en la instancia y bindear por seguridad
router.get("/", appointmentController.getAll.bind(appointmentController));
router.get("/:id", appointmentController.getById.bind(appointmentController));
router.post("/", appointmentController.create.bind(appointmentController));
router.put("/:id", appointmentController.update.bind(appointmentController));
router.delete("/:id", appointmentController.delete.bind(appointmentController));

module.exports = router;
