const express = require('express');
const medicController = require('../controllers/medic.controller');

// Rutas para manejo de médicos (medics)
// Montadas en /medics desde app.ts
const router = express.Router();

// Crear médico
router.post('/', medicController.createMedic);

// Listar médicos
router.get('/', medicController.getAllMedics);

// Buscar por email (query ?email=...)
router.get('/email', medicController.getMedicByEmail);

// Listar por especialidad
router.get('/specialty/:specialtyId', medicController.getMedicsBySpecialty);

// Obtener por ID
router.get('/:id', medicController.getMedicById);

// Actualizar
router.put('/:id', medicController.updateMedic);

// Eliminar
router.delete('/:id', medicController.deleteMedic);

module.exports = router;
