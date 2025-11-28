/**
 * Modelo de datos para `Appointment` (turnos).
 *
 * Provee operaciones CRUD sencillas sobre la entidad Appointment y
 * lanza errores descriptivos cuando ocurre algún fallo.
 */
const { Appointment } = require("../sqlite/entities/appointment.entity");

class AppointmentModel {
  // Crea un nuevo turno
  async create(appointmentData: any) {
    try {
      const newAppointment = await Appointment.create(appointmentData);
      return newAppointment;
    } catch (error: any) {
      throw new Error("Error creating appointment: " + error.message);
    }
  }

  // Obtiene todos los turnos
  async getAll() {
    try {
      const appointments = await Appointment.findAll();
      return appointments;
    } catch (error: any) {
      throw new Error("Error fetching appointments: " + error.message);
    }
  }
  // Obtiene un turno por ID (lanza si no existe)
  async getById(id: number) {
    try {
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        throw new Error("Appointment not found");
      }
      return appointment;
    } catch (error: any) {
      throw new Error("Error fetching appointment: " + error.message);
    }
  }

  // Actualiza un turno por ID
  async update(id: number, appointmentData: any) {
    try {
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        throw new Error("Appointment not found");
      }
      const updatedAppointment = await appointment.update(appointmentData);
      return updatedAppointment;
    } catch (error: any) {
      throw new Error("Error updating appointment: " + error.message);
    }
  }

  // Elimina un turno por ID
  async delete(id: number) {
    try {
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        throw new Error("Appointment not found");
      }
      await appointment.destroy();
      return true;
    } catch (error: any) {
      throw new Error("Error deleting appointment: " + error.message);
    }
  }
}

module.exports = new AppointmentModel();
