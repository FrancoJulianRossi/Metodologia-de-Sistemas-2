import express from "express";

// Importar el controlador de specialities para manejar las peticiones
const specialityController = require("../controllers/speciality.controller");

// Crear router de Express
const router = express.Router();

// GET - Obtener todas las especialidades
router.get("/", specialityController.getAllSpecialities);

// GET - Obtener una especialidad por ID
router.get("/:id", specialityController.getSpecialityById);

// POST - Crear una nueva especialidad
router.post("/", specialityController.createSpeciality);

// PUT - Actualizar una especialidad por ID
router.put("/:id", specialityController.updateSpeciality);

// DELETE - Eliminar una especialidad por ID
router.delete("/:id", specialityController.deleteSpeciality);

module.exports = router;