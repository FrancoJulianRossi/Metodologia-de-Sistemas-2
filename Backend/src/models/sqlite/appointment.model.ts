const { Appointment } = require("../sqlite/entities/appointment.entity");

class AppointmentModel {
  async create(appointmentData: any) {
    try {
      const newAppointment = await Appointment.create(appointmentData);
      return newAppointment;
    } catch (error: any) {
      throw new Error("Error creating appointment: " + error.message);
    }
  }

  async getAll() {
    try {
      const appointments = await Appointment.findAll();
      return appointments;
    } catch (error: any) {
      throw new Error("Error fetching appointments: " + error.message);
    }
  }
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
