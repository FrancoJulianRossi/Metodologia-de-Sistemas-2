// Observer interface for implementing the Observer design pattern
export interface Observer {
    // Method called when appointment data is updated
    update(appointmentData: any): Promise<void>;
}