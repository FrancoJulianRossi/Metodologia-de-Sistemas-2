import express from "express";

// Import the speciality controller for handling requests
const specialityController = require("../controllers/speciality.controller");

// Create Express router instance
const router = express.Router();

// GET - Retrieve all specialities
router.get("/", specialityController.getAllSpecialities);

// GET - Retrieve a specific speciality by ID
router.get("/:id", specialityController.getSpecialityById);

// POST - Create a new speciality
router.post("/", specialityController.createSpeciality);

// PUT - Update an existing speciality by ID
router.put("/:id", specialityController.updateSpeciality);

// DELETE - Delete a speciality by ID
router.delete("/:id", specialityController.deleteSpeciality);

module.exports = router;