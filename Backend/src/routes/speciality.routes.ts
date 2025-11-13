import express from "express";

const specialityController = require("../controllers/speciality.controller.js");

const router = express.Router();

router.get("/", specialityController.getAllSpecialities.bind(specialityController));
router.get("/:id", specialityController.getSpecialityById.bind(specialityController));
router.post("/", specialityController.createSpeciality.bind(specialityController));
router.put("/:id", specialityController.updateSpeciality.bind(specialityController));
router.delete("/:id", specialityController.deleteSpeciality.bind(specialityController));


module.exports = router;