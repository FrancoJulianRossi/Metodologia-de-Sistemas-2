/**
 * Controlador de appointments (turnos).
 *
 * Este archivo expone las rutas CRUD para los turnos y encapsula la lógica
 * de validación de entradas y notificación a los observadores cuando ocurre
 * un cambio relevante (creación, actualización, cancelación).
 */
const appointmentModel = require("../models/sqlite/appointment.model");
import { appointmentSubject } from "../observer/appointment.subject";
import { PatientObserver } from "../observer/patient.observer";
import { MedicObserver } from "../observer/medic.observer";
import { notificationService } from "../services/notification.service";

class AppointmentController {
  private patientObserver: PatientObserver;
  private medicObserver: MedicObserver;

  constructor() {
    // Inicializar observadores
    this.patientObserver = new PatientObserver(notificationService);
    this.medicObserver = new MedicObserver(notificationService);

    // Registrar observadores al subject
    appointmentSubject.attach(this.patientObserver);
    appointmentSubject.attach(this.medicObserver);
  }

  // CRUD OPERATIONS FOR APPOINTMENT
  async create(req: any, res: any) {
    try {
      const { date, time, status, id_patient, id_medic } = req.body;
      if (!date || !time || !status || !id_patient || !id_medic) {
        return res.status(400).json({
          error:
            "Falta completar los campos: date, time, status, id_patient, id_medic",
        });
      }
      const newAppointment = await appointmentModel.create({
        date,
        time,
        status,
        id_patient,
        id_medic,
      });
      res.status(201).json(newAppointment);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Error creando el appointment: " + error.message });
    }
  }
  async getAll(req: any, res: any) {
    try {
      const appointments = await appointmentModel.getAll();
      res.status(200).json(appointments);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Error obteniendo los appointments: " + error.message });
    }
  }

  async getById(req: any, res: any) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Falta completar el campo: id" });
      }
      const appointment = await appointmentModel.getById(Number(id));
      res.status(200).json(appointment);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Error obteniendo el appointment: " + error.message });
    }
  }

  async update(req: any, res: any) {
    try {
      const { id } = req.params;
      const { date, time, status, id_patient, id_medic } = req.body;
      if (!id) {
        return res.status(400).json({ error: "Falta completar el campo: id" });
      }

      // Obtener el appointment actual para comparar cambios
      const currentAppointment = await appointmentModel.getById(Number(id));

      const updatedAppointment = await appointmentModel.update(Number(id), {
        date,
        time,
        status,
        id_patient,
        id_medic,
      });

      // Determinar qué cambió
      let changeType = "updated";
      if (currentAppointment.status !== status) {
        if (status === "cancelled") {
          changeType = "cancelled";
        } else if (status === "confirmed") {
          changeType = "confirmed";
        }
      }
      if (
        currentAppointment.date !== date ||
        currentAppointment.time !== time
      ) {
        changeType = "rescheduled";
      }

      // Notificar a los observadores
      await appointmentSubject.notifyObservers({
        id: Number(id),
        ...updatedAppointment.dataValues,
        changeType,
      });

      res.status(200).json(updatedAppointment);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Error actualizando el appointment: " + error.message });
    }
  }
  async delete(req: any, res: any) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "Falta completar el campo: id" });
      }

      // Obtener el appointment antes de eliminarlo para notificar
      const appointment = await appointmentModel.getById(Number(id));

      await appointmentModel.delete(Number(id));

      // Notificar a los observadores sobre la cancelación
      await appointmentSubject.notifyObservers({
        id: Number(id),
        ...appointment.dataValues,
        changeType: "cancelled",
        status: "cancelled",
      });

      res.status(200).json({ message: "Appointment eliminado exitosamente" });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: "Error eliminando el appointment: " + error.message });
    }
  }
}

// Export as CommonJS instance to match how routes require controllers in this project
module.exports = new AppointmentController();
