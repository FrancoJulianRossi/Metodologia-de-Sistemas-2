/**
 * Observer Module Exports
 * Archivo central para exportar todos los componentes del patrón Observer
 */

export { Observer } from "./observer.interface";
export { AppointmentSubject, appointmentSubject } from "./appointment.subject";
export { PatientObserver } from "./patient.observer";
export { MedicObserver } from "./medic.observer";

// Uso:
// import { appointmentSubject, PatientObserver, MedicObserver } from './observer';
