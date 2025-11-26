// Import the Speciality entity model
const { Speciality } = require("./entities/speciality.entity.js");

// Model class for handling speciality database operations
class SpecialityModel {
  // Retrieves all specialities from the database
  async getSpecialities() {
    console.log("hola");
    return Speciality.findAll();
  }

  // Retrieves a specific speciality by its primary key (ID)
  async getSpecialityById(id: number) {
    const speciality = await Speciality.findByPk(id);
    // Throws error if speciality doesn't exist
    if (!speciality) {
      throw new Error("Especialidad no encontrada");
    }
    return speciality;
  }

  // Retrieves a speciality by its name
  async getSpecialityByName(name: string) {
    const speciality = await Speciality.findOne({ where: { name } });
    // Throws error if speciality doesn't exist
    if (!speciality) {
      throw new Error("Especialidad no encontrada");
    }
    return speciality;
  }

  // Creates a new speciality with the provided data (name and description)
  async create(specialityData: { name: string; description: string }) {
    return Speciality.create(specialityData);
  }

  // Updates an existing speciality with new data
  async update(
    id: number,
    specialityData: { name?: string; description?: string }
  ) {
    const speciality = await this.getSpecialityById(id);
    return speciality.update(specialityData);
  }

  // Deletes a speciality from the database by ID
  async delete(id: number) {
    const speciality = await this.getSpecialityById(id);
    return speciality.destroy();
  }
}

module.exports = new SpecialityModel();
