// Importar el modelo de entidad Speciality
const { Speciality } = require("./entities/speciality.entity.js");

/**
 * Modelo de datos para `Speciality` (especialidades).
 * Provee métodos para CRUD y búsquedas por nombre o ID.
 */
class SpecialityModel {
  // Obtiene todas las especialidades desde la BD
  async getSpecialities() {
    console.log("hola");
    return Speciality.findAll();
  }

  // Obtiene una especialidad por su PK (id)
  async getSpecialityById(id: number) {
    const speciality = await Speciality.findByPk(id);
    // Lanzar error si no existe
    if (!speciality) {
      throw new Error("Especialidad no encontrada");
    }
    return speciality;
  }

  // Obtiene una especialidad por nombre
  async getSpecialityByName(name: string) {
    const speciality = await Speciality.findOne({ where: { name } });
    // Lanzar error si no existe
    if (!speciality) {
      throw new Error("Especialidad no encontrada");
    }
    return speciality;
  }

  // Crea una nueva especialidad con los datos proporcionados
  async create(specialityData: { name: string; description: string }) {
    return Speciality.create(specialityData);
  }

  // Actualiza una especialidad existente
  async update(
    id: number,
    specialityData: { name?: string; description?: string }
  ) {
    const speciality = await this.getSpecialityById(id);
    return speciality.update(specialityData);
  }

  // Elimina una especialidad por ID
  async delete(id: number) {
    const speciality = await this.getSpecialityById(id);
    return speciality.destroy();
  }
}

module.exports = new SpecialityModel();
