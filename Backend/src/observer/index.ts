// Exportar módulos relacionados con el patrón Observer
// Estos módulos cumplen el patrón Observer: Subject (AppointmentSubject)
// y Observers concretos (PatientObserver, MedicObserver).
export { Observer } from "./observer.interface";
export { AppointmentSubject, appointmentSubject } from "./appointment.subject";
export { PatientObserver } from "./patient.observer";
export { MedicObserver } from "./medic.observer";
