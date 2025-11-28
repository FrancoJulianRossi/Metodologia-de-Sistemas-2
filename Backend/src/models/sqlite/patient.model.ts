/**
 * Modelo de datos para `Patient` (pacientes).
 *
 * Encapsula CRUD y búsquedas específicas (p.ej. por DNI). Los métodos
 * devuelven objetos Sequelize o lanzan errores descriptivos.
 */
const { Patient } = require("../sqlite/entities/patient.entity.js");

class PatientModel {
  // CRUD OPERATIONS

  // Crea un nuevo paciente
  async create(patientData: any) {
    try {
      const newPatient = await Patient.create(patientData);
      return newPatient;
    } catch (error: any) {
      throw new Error("Error creating patient: " + error.message);
    }
  }

  // Obtiene todos los pacientes
  async getAll() {
    try {
      const patients = await Patient.findAll();
      return patients;
    } catch (error: any) {
      throw new Error("Error getting patients: " + error.message);
    }
  }

  getPatientsModel() {
    // Alias usado por algunas partes del código
    return this.getAll();
  }

  // Obtiene paciente por ID
  async getById(id: number) {
    try {
      const patient = await Patient.findByPk(id);
      if (!patient) {
        throw new Error("Patient not found");
      }
      return patient;
    } catch (error: any) {
      throw new Error("Error getting patient: " + error.message);
    }
  }

  getPatientByIdModel(id: number) {
    // Alias: devuelve lo mismo que getById
    return this.getById(id);
  }

  // Actualiza paciente por ID
  async update(id: number, patientData: any) {
    try {
      const patient = await Patient.findByPk(id);
      if (!patient) {
        throw new Error("Patient not found");
      }
      const updatedPatient = await patient.update(patientData);
      return updatedPatient;
    } catch (error: any) {
      throw new Error("Error updating patient: " + error.message);
    }
  }

  // Elimina paciente por ID
  async delete(id: number) {
    try {
      const patient = await Patient.findByPk(id);
      if (!patient) {
        throw new Error("Patient not found");
      }
      await patient.destroy();
      return true;
    } catch (error: any) {
      throw new Error("Error deleting patient: " + error.message);
    }
  }

  // Busca paciente por DNI
  async getByDni(dni: string) {
    try {
      const patient = await Patient.findOne({ where: { dni: dni } });
      return patient;
    } catch (error: any) {
      throw new Error("Error getting patient by dni: " + error.message);
    }
  }
}

module.exports = new PatientModel();
