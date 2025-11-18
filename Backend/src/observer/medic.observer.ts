import { Observer } from './observer.interface';
import { NotificationService } from '../services/notification.service';

export class MedicObserver implements Observer {
    private notificationService: NotificationService;

    constructor(notificationService: NotificationService) {
        this.notificationService = notificationService;
    }

    async update(appointmentData: any): Promise<void> {
        try {
            const { id_medic, id_patient, status, date, time, changeType } = appointmentData;

            let message = '';
            let title = '';

            switch (changeType) {
                case 'rescheduled':
                    title = 'Turno reprogramado';
                    message = `El turno del paciente (ID: ${id_patient}) ha sido reprogramado para el ${date} a las ${time}`;
                    break;
                case 'cancelled':
                    title = 'Turno cancelado';
                    message = `El turno del paciente (ID: ${id_patient}) programado para el ${date} a las ${time} ha sido cancelado`;
                    break;
                case 'confirmed':
                    title = 'Turno confirmado';
                    message = `El turno del paciente (ID: ${id_patient}) ha sido confirmado para el ${date} a las ${time}`;
                    break;
                default:
                    title = 'Cambio en un turno';
                    message = `El turno del paciente (ID: ${id_patient}) ha cambiado. Nuevo estado: ${status}`;
            }

            await this.notificationService.sendNotification({
                userId: id_medic,
                userType: 'medic',
                title,
                message,
                appointmentId: appointmentData.id,
                changeType
            });

            console.log(`✓ Notificación enviada al médico (ID: ${id_medic})`);
        } catch (error) {
            console.error('Error notificando al médico:', error);
            throw error;
        }
    }
}