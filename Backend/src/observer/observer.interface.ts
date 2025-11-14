export interface Observer {
    update(appointmentData: any): Promise<void>;
}