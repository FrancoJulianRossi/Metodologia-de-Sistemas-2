const express = require('express');
const medicController = require('../controllers/medic.controller');

const router = express.Router();

router.post('/', medicController.createMedic);

router.get('/', medicController.getAllMedics);

router.get('/email', medicController.getMedicByEmail);

router.get('/specialty/:specialtyId', medicController.getMedicsBySpecialty);

router.get('/:id', medicController.getMedicById);

router.put('/:id', medicController.updateMedic);

router.delete('/:id', medicController.deleteMedic);

module.exports = router;
