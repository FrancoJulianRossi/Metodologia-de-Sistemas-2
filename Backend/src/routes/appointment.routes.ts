import express from "express";
const appointmentController = require("../controllers/appointment.controller");

const router = express.Router();

// Use the controller methods as exported by the controller instance
router.get("/", appointmentController.getAll);
router.get("/:id", appointmentController.getById);
router.post("/", appointmentController.create);
router.put("/:id", appointmentController.update);
router.delete("/:id", appointmentController.delete);

module.exports = router;
