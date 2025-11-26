import { Observer } from './observer.interface';

/**
 * AppointmentSubject (Observable)
 * Mantiene una lista de observadores y notifica cambios en appointments
 */
export class AppointmentSubject {
    private observers: Observer[] = [];

    /**
     * Registra un observador
     */
    attach(observer: Observer): void {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
            console.log(`Observer registrado. Total: ${this.observers.length}`);
        }
    }

    /**
     * Desregistra un observador
     */
    detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
            console.log(`Observer desregistrado. Total: ${this.observers.length}`);
        }
    }

    /**
     * Notifica a todos los observadores sobre cambios en el appointment
     */
    async notifyObservers(appointmentData: any): Promise<void> {
        for (const observer of this.observers) {
            try {
                await observer.update(appointmentData);
            } catch (error) {
                console.error('Error notificando observer:', error);
            }
        }
    }

    /**
     * Obtiene el número de observadores registrados
     */
    getObserverCount(): number {
        return this.observers.length;
    }
}

// Instancia singleton del subject
export const appointmentSubject = new AppointmentSubject();