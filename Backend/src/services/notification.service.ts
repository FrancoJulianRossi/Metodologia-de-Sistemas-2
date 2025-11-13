/**
 * NotificationService
 * Servicio centralizado para manejar notificaciones
 * Puede ser extendido para usar email, SMS, push notifications, etc.
 */

interface Notification {
    userId: number;
    userType: 'patient' | 'medic';
    title: string;
    message: string;
    appointmentId: number;
    changeType: string;
    timestamp?: Date;
}

export class NotificationService {
    private notifications: Notification[] = [];

    /**
     * Envía una notificación
     * En producción, esto podría enviar emails, SMS, push notifications, etc.
     */
    async sendNotification(notification: Notification): Promise<void> {
        try {
            // Agregar timestamp si no existe
            notification.timestamp = new Date();

            // Guardar notificación en memoria (en producción usar BD)
            this.notifications.push(notification);

            // Log de la notificación
            this.logNotification(notification);

            // Aquí podrías agregar integraciones reales:
            // - await this.sendEmail(notification);
            // - await this.sendSMS(notification);
            // - await this.sendPushNotification(notification);
            
        } catch (error) {
            console.error('Error en sendNotification:', error);
            throw error;
        }
    }

    /**
     * Obtiene notificaciones de un usuario
     */
    getNotificationsByUser(userId: number, userType: 'patient' | 'medic'): Notification[] {
        return this.notifications.filter(
            n => n.userId === userId && n.userType === userType
        );
    }

    /**
     * Log de notificaciones
     */
    private logNotification(notification: Notification): void {
        console.log(`
╔════════════════════════════════════════╗
║           NOTIFICACIÓN ENVIADA          ║
╚════════════════════════════════════════╝
📨 Para: ${notification.userType === 'patient' ? 'Paciente' : 'Médico'} (ID: ${notification.userId})
📝 Título: ${notification.title}
💬 Mensaje: ${notification.message}
🔗 Appointment ID: ${notification.appointmentId}
🏷️  Tipo: ${notification.changeType}
⏰ Hora: ${notification.timestamp?.toLocaleString('es-ES')}
════════════════════════════════════════
        `);
    }

    /**
     * Obtiene todas las notificaciones (para debug)
     */
    getAllNotifications(): Notification[] {
        return this.notifications;
    }

    /**
     * Limpia todas las notificaciones (para testing)
     */
    clearNotifications(): void {
        this.notifications = [];
    }
}

// Instancia singleton del servicio
export const notificationService = new NotificationService();
