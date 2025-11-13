/**
 * Observer Interface
 * Define el contrato que deben cumplir todos los observadores
 */
export interface Observer {
    update(appointmentData: any): Promise<void>;
}
