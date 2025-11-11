const { Patient } = require("../sqlite/entities/patient.entity.js");

class PatientModel {
  // CRUD OPERATIONS

  async create(patientData: any) {
    try {
      const newPatient = await Patient.create(patientData);
      return newPatient;
    } catch (error: any) {
      throw new Error("Error creating patient: " + error.message);
    }
  }

  async getAll() {
    try {
      const patients = await Patient.findAll();
      return patients;
    } catch (error: any) {
      throw new Error("Error getting patients: " + error.message);
    }
  }

  getPatientsModel() {
    return this.getAll();
  }

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
    return this.getById(id);
  }

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
