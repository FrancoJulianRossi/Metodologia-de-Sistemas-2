/**
 * Interfaz Observer del patrón Observer.
 * Define el contrato que deben cumplir todos los observadores
 * que deseen recibir notificaciones de cambios en appointments.
 */
// Interfaz Observer para implementar el patrón Observer
export interface Observer {
    // Método llamado cuando los datos de la cita se actualizan
    update(appointmentData: any): Promise<void>;
}