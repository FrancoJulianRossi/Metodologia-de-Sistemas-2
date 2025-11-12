const { Patient } = require("../sqlite/entities/patient.entity.js");

class PatientModel {
  getPatientsModel() {
    const users = Patient.findAll();
    return users;
  }

  getPatientByIdModel(id: number) {
    return new Promise((resolve, reject) => {
      const user = Patient.findByPk(id);
      if (!user) {
        reject(new Error("Usuario no encontrado"));
      }
      resolve(user);
    });
  }
}

module.exports = new PatientModel();
