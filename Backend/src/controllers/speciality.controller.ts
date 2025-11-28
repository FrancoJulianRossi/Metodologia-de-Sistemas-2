// Importar el modelo speciality para operaciones de BD
const specialityModel = require("../models/sqlite/speciality.model");

// Controlador para manejar las rutas relacionadas con especialidades
class speacialityController {
  // Obtiene todas las especialidades desde la BD
  async getAllSpecialities(req: any, res: any) {
    try {
      const specialities = await specialityModel.getSpecialities();
      res.status(200).json(specialities);
    } catch (error: any) {
      console.error("Error retrieving specialities:", error);
      res.status(500).json({
        error:
          error instanceof Error
            ? error.message
            : "Error retrieving specialities",
      });
    }
  }

  // Obtiene una especialidad por su ID
  async getSpecialityById(req: any, res: any) {
    try {
      const id = parseInt(req.params.id);
      const speciality = await specialityModel.getSpecialityById(id);
      res.status(200).json(speciality);
    } catch (error: any) {
      console.error("Error retrieving speciality by ID:", error);
      res.status(404).json({
        error:
          error instanceof Error
            ? error.message
            : "Error retrieving speciality",
      });
    }
  }

  // Crea una nueva especialidad en la BD
  async createSpeciality(req: any, res: any) {
    try {
      const specialityData = req.body;
      const newSpeciality = await specialityModel.create(specialityData);
      res.status(201).json(newSpeciality);
    } catch (error: any) {
      console.error("Error creating speciality:", error);
      res.status(500).json({
        error:
          error instanceof Error ? error.message : "Error creating speciality",
      });
    }
  }

  // Actualiza una especialidad existente
  async updateSpeciality(req: any, res: any) {
    try {
      const id = parseInt(req.params.id);
      const specialityData = req.body;
      const updatedSpeciality = await specialityModel.update(
        id,
        specialityData
      );
      res.status(200).json(updatedSpeciality);
    } catch (error: any) {
      console.error("Error updating speciality:", error);
      res.status(404).json({
        error:
          error instanceof Error ? error.message : "Error updating speciality",
      });
    }
  }

  // Elimina una especialidad por ID
  async deleteSpeciality(req: any, res: any) {
    try {
      const id = parseInt(req.params.id);
      await specialityModel.delete(id);
      res.status(204).send();
    } catch (error: any) {
      console.error("Error deleting speciality:", error);
      res.status(404).json({
        error:
          error instanceof Error ? error.message : "Error deleting speciality",
      });
    }
  }
}

module.exports = new speacialityController();
