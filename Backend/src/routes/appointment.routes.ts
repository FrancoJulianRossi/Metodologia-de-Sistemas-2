import express from "express";
const appointmentController = require("../controllers/appointment.controller.js");

const router = express.Router();
router.get("/", appointmentController.getAllAppointments.bind(appointmentController));
router.get("/:id", appointmentController.getAppointmentById.bind(appointmentController));
router.post("/", appointmentController.createAppointment.bind(appointmentController));
router.put("/:id", appointmentController.updateAppointment.bind(appointmentController));
router.delete("/:id", appointmentController.deleteAppointment.bind(appointmentController));
module.exports = router;
