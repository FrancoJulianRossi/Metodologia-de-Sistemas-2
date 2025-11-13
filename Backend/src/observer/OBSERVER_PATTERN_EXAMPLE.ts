/**
 * EJEMPLO DE USO DEL PATRÓN OBSERVER
 *
 * Este archivo documenta cómo funciona el patrón Observer implementado
 * para notificaciones de cambios en appointments
 */

/**
 * FLUJO DE FUNCIONAMIENTO:
 *
 * 1. AppointmentController se inicializa
 *    - Crea instancias de PatientObserver y MedicObserver
 *    - Los registra en AppointmentSubject (appointmentSubject.attach())
 *
 * 2. Cuando se actualiza un appointment (PUT)
 *    - Se compara el estado anterior con el nuevo
 *    - Se determina el tipo de cambio (rescheduled, cancelled, confirmed)
 *    - appointmentSubject.notifyObservers() es llamado
 *
 * 3. AppointmentSubject notifica a todos los observadores
 *    - Itera sobre PatientObserver y MedicObserver
 *    - Llama al método update() de cada observador
 *
 * 4. Cada observador maneja la notificación
 *    - PatientObserver: Envía notificación al paciente
 *    - MedicObserver: Envía notificación al médico
 *    - Ambos usan NotificationService para enviar la notificación
 *
 * 5. NotificationService
 *    - Almacena la notificación
 *    - La registra en el sistema
 *    - Puede enviar email, SMS, push notifications, etc.
 */

/**
 * EJEMPLOS DE CAMBIOS QUE DISPARAN NOTIFICACIONES:
 */

// Ejemplo 1: Reprogramar un turno (cambio de fecha/hora)
/*
PUT /appointments/5
{
  "date": "2024-12-20",
  "time": "15:30",
  "status": "pending",
  "id_patient": 1,
  "id_medic": 2
}

Resultado:
- changeType = 'rescheduled'
- PatientObserver: Notifica "Tu turno ha sido reprogramado para el 2024-12-20 a las 15:30"
- MedicObserver: Notifica "El turno del paciente ha sido reprogramado para el 2024-12-20 a las 15:30"
*/

// Ejemplo 2: Cancelar un turno (cambio de status a cancelled)
/*
PUT /appointments/5
{
  "date": "2024-12-15",
  "time": "14:00",
  "status": "cancelled",
  "id_patient": 1,
  "id_medic": 2
}

Resultado:
- changeType = 'cancelled'
- PatientObserver: Notifica "Tu turno ha sido cancelado"
- MedicObserver: Notifica "El turno del paciente ha sido cancelado"
*/

// Ejemplo 3: Confirmar un turno (cambio de status a confirmed)
/*
PUT /appointments/5
{
  "date": "2024-12-15",
  "time": "14:00",
  "status": "confirmed",
  "id_patient": 1,
  "id_medic": 2
}

Resultado:
- changeType = 'confirmed'
- PatientObserver: Notifica "Tu turno ha sido confirmado"
- MedicObserver: Notifica "El turno ha sido confirmado"
*/

// Ejemplo 4: Eliminar un turno (DELETE)
/*
DELETE /appointments/5

Resultado:
- changeType = 'cancelled'
- PatientObserver: Notifica "Tu turno ha sido cancelado"
- MedicObserver: Notifica "El turno del paciente ha sido cancelado"
*/

/**
 * ESTRUCTURA DEL PATRÓN:
 *
 * Observer Interface
 *     ↑
 *     │ implements
 *     │
 * ┌───┴────────────────────────┐
 * │                              │
 * PatientObserver          MedicObserver
 *     │                         │
 *     └─────────────┬──────────┘
 *                   │ registrados en
 *             AppointmentSubject
 *                   │ notifica a
 *             NotificationService
 */

/**
 * CÓMO EXTENDER EL SISTEMA:
 *
 * Para agregar más observadores:
 *
 * 1. Crear una clase que implemente Observer:
 *
 * export class EmailNotificationObserver implements Observer {
 *   async update(appointmentData: any): Promise<void> {
 *     // Lógica para enviar emails
 *   }
 * }
 *
 * 2. Registrar en AppointmentController:
 *
 * const emailObserver = new EmailNotificationObserver(emailService);
 * appointmentSubject.attach(emailObserver);
 */

export {};
