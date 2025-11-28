/**
 * Controlador de pacientes.
 *
 * Expone operaciones CRUD sobre pacientes y contiene comprobaciones
 * adicionales (p.ej. validar que no existan turnos relacionados al eliminar).
 */
const patientModel = require("../models/sqlite/patient.model.js");
const {
  Appointment,
} = require("../models/sqlite/entities/appointment.entity.js");

class PatientController {
  // CRUD OPERATIONS FOR PATIENT
  /**
   * Crea un nuevo paciente. Valida campos requeridos.
   */
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

  /**
   * Obtiene un paciente por ID. Valida parámetro y delega al modelo.
   */
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

  /**
   * Actualiza un paciente por ID. Requiere datos en el cuerpo.
   */
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

  /**
   * Elimina un paciente si no tiene turnos relacionados.
   * Si existen turnos, devuelve un error amigable.
   */
  async delete(req: any, res: any) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          error: "Missing required field: id",
        });
      }

      // Comprobar si existen appointments que referencien al paciente
      try {
        const related = await Appointment.findOne({
          where: { id_patient: parseInt(id) },
        });
        if (related) {
          return res.status(400).json({
            error:
              "No se puede eliminar el paciente porque tiene un turno asignado",
          });
        }
      } catch (err: any) {
        // si hay un error accediendo a Appointment, seguir adelante y dejar que el intento de borrado original falle con 500
        console.error("Error comprobando appointments relacionados:", err);
      }

      const result = await patientModel.delete(parseInt(id));
      return res.status(200).json({
        message: "Patient deleted successfully",
        data: result,
      });
    } catch (error: any) {
      // Si el error es por constraint de FK, devolver un mensaje amigable en español
      const msg = (error && error.message) || "Error deleting patient";
      if (
        typeof msg === "string" &&
        (msg.includes("FOREIGN KEY") ||
          msg.includes("SQLITE_CONSTRAINT") ||
          msg.includes("constraint"))
      ) {
        return res.status(400).json({
          error:
            "No se puede eliminar el paciente porque tiene un turno asignado",
        });
      }
      return res.status(500).json({
        error: msg || "Error deleting patient",
      });
    }
  }

  /**
   * Busca un paciente por DNI (parámetro `dni`).
   */
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
