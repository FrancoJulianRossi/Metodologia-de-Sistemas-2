// Interfaz Observer para implementar el patrón Observer
export interface Observer {
    // Método llamado cuando los datos de la cita se actualizan
    update(appointmentData: any): Promise<void>;
}