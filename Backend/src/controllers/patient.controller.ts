const patientModel = require("../models/sqlite/patient.model.js");

class PatientController {
  // CRUD OPERATIONS FOR PATIENT
  async create(req: any, res: any) {
    try {
      const { dni, name, lastname, email, password, phoneNumber } = req.body;

      // Validate required fields
      if (!dni || !name || !lastname || !email || !password || !phoneNumber) {
        return res.status(400).json({
          error:
            "Missing required fields: dni, name, lastname, email, password, phoneNumber",
        });
      }

      const newPatient = await patientModel.create({
        dni,
        name,
        lastname,
        email,
        password,
        phoneNumber,
      });

      return res.status(201).json({
        message: "Patient created successfully",
        data: newPatient,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message || "Error creating patient",
      });
    }
  }

  async getAll(req: any, res: any) {
    try {
      const patients = await patientModel.getAll();
      return res.status(200).json({
        message: "Patients retrieved successfully",
        data: patients,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message || "Error retrieving patients",
      });
    }
  }

  async getById(req: any, res: any) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "Missing required field: id",
        });
      }

      const patient = await patientModel.getById(parseInt(id));
      return res.status(200).json({
        message: "Patient retrieved successfully",
        data: patient,
      });
    } catch (error: any) {
      return res.status(404).json({
        error: error.message || "Patient not found",
      });
    }
  }

  async update(req: any, res: any) {
    try {
      const { id } = req.params;
      const patientData = req.body;

      if (!id) {
        return res.status(400).json({
          error: "Missing required field: id",
        });
      }

      if (Object.keys(patientData).length === 0) {
        return res.status(400).json({
          error: "No data provided to update",
        });
      }

      const updatedPatient = await patientModel.update(
        parseInt(id),
        patientData
      );
      return res.status(200).json({
        message: "Patient updated successfully",
        data: updatedPatient,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message || "Error updating patient",
      });
    }
  }

  async delete(req: any, res: any) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "Missing required field: id",
        });
      }

      const result = await patientModel.delete(parseInt(id));
      return res.status(200).json({
        message: "Patient deleted successfully",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message || "Error deleting patient",
      });
    }
  }

  async getByDni(req: any, res: any) {
    try {
      const { dni } = req.params;

      if (!dni) {
        return res.status(400).json({
          error: "Missing required parameter: dni",
        });
      }

      const patient = await patientModel.getByDni(dni as string);

      if (!patient) {
        return res.status(404).json({
          error: "Patient not found",
        });
      }

      return res.status(200).json({
        message: "Patient retrieved successfully",
        data: patient,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: error.message || "Error retrieving patient",
      });
    }
  }
}

module.exports = new PatientController();
