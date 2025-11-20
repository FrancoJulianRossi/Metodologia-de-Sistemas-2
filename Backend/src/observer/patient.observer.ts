import { Observer } from "./observer.interface";
import { NotificationService } from "../services/notification.service";

/**
 * PatientObserver
 * Observador concreto que notifica al paciente sobre cambios en sus appointments
 */
export class PatientObserver implements Observer {
  private notificationService: NotificationService;

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
  }

  async update(appointmentData: any): Promise<void> {
    try {
      const { id_patient, status, date, time, changeType } = appointmentData;

      let message = "";
      let title = "";

      switch (changeType) {
        case "rescheduled":
          title = "Tu turno ha sido reprogramado";
          message = `Tu cita ha sido reprogramada para el ${date} a las ${time}`;
          break;
        case "cancelled":
          title = "Tu turno ha sido cancelado";
          message = `Tu cita programada para el ${date} a las ${time} ha sido cancelada`;
          break;
        case "confirmed":
          title = "Tu turno ha sido confirmado";
          message = `Tu cita ha sido confirmada para el ${date} a las ${time}`;
          break;
        default:
          title = "Cambio en tu turno";
          message = `Tu cita ha cambiado. Nuevo estado: ${status}`;
      }

      await this.notificationService.sendNotification({
        userId: id_patient,
        userType: "patient",
        title,
        message,
        appointmentId: appointmentData.id,
        changeType,
      });

      console.log(`✓ Notificación enviada al paciente (ID: ${id_patient})`);
    } catch (error) {
      console.error("Error notificando al paciente:", error);
      throw error;
    }
  }
}
