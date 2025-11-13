/**
 * OBSERVER PATTERN - DIAGRAMA UML
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │                        OBSERVER PATTERN                              │
 * │                     (Patrón de Diseño)                              │
 * └─────────────────────────────────────────────────────────────────────┘
 *
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │                          INTERFACES                                   │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │  Observer                                                            │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │  + update(appointmentData: any): Promise<void>                       │
 * └──────────────────────────────────────────────────────────────────────┘
 *                                  ▲
 *                                  │ implements
 *                  ┌───────────────┼───────────────┐
 *                  │               │               │
 *        ┌─────────┴─────────┐     │     ┌─────────┴─────────┐
 *        │ PatientObserver   │     │     │ MedicObserver     │
 *        ├───────────────────┤     │     ├───────────────────┤
 *        │ - notification    │     │     │ - notification    │
 *        │   Service         │     │     │   Service         │
 *        ├───────────────────┤     │     ├───────────────────┤
 *        │ + update()        │     │     │ + update()        │
 *        └───────────────────┘     │     └───────────────────┘
 *                                  │
 *                      ┌───────────┴──────────┐
 *                      │                      │
 *                      │   Otros Observadores │
 *                      │  (EmailObserver,     │
 *                      │   SMSObserver, etc)  │
 *                      └──────────────────────┘
 *
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │                      AppointmentSubject                               │
 * │                     (Observable)                                      │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │ - observers: Observer[]                                              │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │ + attach(observer: Observer): void                                   │
 * │ + detach(observer: Observer): void                                   │
 * │ + notifyObservers(appointmentData: any): Promise<void>              │
 * │ + getObserverCount(): number                                         │
 * └──────────────────────────────────────────────────────────────────────┘
 *                                  │
 *                                  │ uses
 *                                  ▼
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │                    NotificationService                                │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │ - notifications: Notification[]                                      │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │ + sendNotification(notification: Notification): Promise<void>       │
 * │ + getNotificationsByUser(userId, userType): Notification[]          │
 * │ + getAllNotifications(): Notification[]                              │
 * │ + clearNotifications(): void                                         │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │                  AppointmentController                                │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │ - patientObserver: PatientObserver                                   │
 * │ - medicObserver: MedicObserver                                       │
 * ├──────────────────────────────────────────────────────────────────────┤
 * │ + create(req, res): Promise<void>                                    │
 * │ + getAll(req, res): Promise<void>                                    │
 * │ + getById(req, res): Promise<void>                                   │
 * │ + update(req, res): Promise<void> ← DISPARA NOTIFICACIONES           │
 * │ + delete(req, res): Promise<void> ← DISPARA NOTIFICACIONES           │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 *
 * ╔════════════════════════════════════════════════════════════════════╗
 * ║                    FLUJO DE INTERACCIÓN                           ║
 * ╠════════════════════════════════════════════════════════════════════╣
 * ║                                                                    ║
 * ║  Cliente (Frontend)                                               ║
 * ║        │                                                          ║
 * ║        │ PUT /appointments/1                                      ║
 * ║        ▼                                                          ║
 * ║  AppointmentController.update()                                   ║
 * ║        │                                                          ║
 * ║        ├─ Obtiene appointment actual                              ║
 * ║        ├─ Actualiza en BD                                         ║
 * ║        ├─ Detecta tipo de cambio                                  ║
 * ║        │                                                          ║
 * ║        │ appointmentSubject.notifyObservers()                     ║
 * ║        ▼                                                          ║
 * ║  AppointmentSubject                                               ║
 * ║        │                                                          ║
 * ║        ├─ Itera observers                                         ║
 * ║        │                                                          ║
 * ║        ├─ PatientObserver.update()                                ║
 * ║        │      └─ NotificationService.sendNotification()           ║
 * ║        │           └─ Paciente notificado ✓                       ║
 * ║        │                                                          ║
 * ║        ├─ MedicObserver.update()                                  ║
 * ║        │      └─ NotificationService.sendNotification()           ║
 * ║        │           └─ Médico notificado ✓                         ║
 * ║        │                                                          ║
 * ║        └─ Otros observadores...                                   ║
 * ║        ▼                                                          ║
 * ║  Response 200 OK                                                  ║
 * ║                                                                   ║
 * ╚════════════════════════════════════════════════════════════════════╝
 *
 *
 * ╔════════════════════════════════════════════════════════════════════╗
 * ║           EJEMPLO: CAMBIOS QUE DISPARAN NOTIFICACIONES            ║
 * ╠════════════════════════════════════════════════════════════════════╣
 * ║                                                                    ║
 * ║  1. REPROGRAMACIÓN (changeType: 'rescheduled')                    ║
 * ║     └─ Cuando date ó time cambian                                 ║
 * ║     └─ Paciente: "Tu turno ha sido reprogramado..."               ║
 * ║     └─ Médico: "El turno ha sido reprogramado..."                 ║
 * ║                                                                    ║
 * ║  2. CANCELACIÓN (changeType: 'cancelled')                         ║
 * ║     └─ Cuando status = 'cancelled'                                ║
 * ║     └─ Cuando se ejecuta DELETE                                   ║
 * ║     └─ Paciente: "Tu turno ha sido cancelado"                     ║
 * ║     └─ Médico: "El turno del paciente ha sido cancelado"          ║
 * ║                                                                    ║
 * ║  3. CONFIRMACIÓN (changeType: 'confirmed')                        ║
 * ║     └─ Cuando status = 'confirmed'                                ║
 * ║     └─ Paciente: "Tu turno ha sido confirmado"                    ║
 * ║     └─ Médico: "El turno ha sido confirmado"                      ║
 * ║                                                                    ║
 * ╚════════════════════════════════════════════════════════════════════╝
 *
 *
 * ╔════════════════════════════════════════════════════════════════════╗
 * ║                     VENTAJAS DEL PATRÓN                            ║
 * ╠════════════════════════════════════════════════════════════════════╣
 * ║                                                                    ║
 * ║  ✓ DESACOPLAMIENTO                                                ║
 * ║    El controlador no depende de la lógica de notificaciones        ║
 * ║    Cada observador es independiente                                ║
 * ║                                                                    ║
 * ║  ✓ EXTENSIBILIDAD                                                 ║
 * ║    Agregar nuevos observadores es trivial                         ║
 * ║    Solo implementar la interfaz Observer                           ║
 * ║                                                                    ║
 * ║  ✓ MANTENIBILIDAD                                                 ║
 * ║    Cada observador maneja su propia lógica                        ║
 * ║    Cambios en un observador no afectan otros                      ║
 * ║                                                                    ║
 * ║  ✓ REUTILIZACIÓN                                                  ║
 * ║    El mismo observable puede notificar a múltiples observadores   ║
 * ║    Los observadores pueden usarse en otros contextos              ║
 * ║                                                                    ║
 * ║  ✓ TESTABILIDAD                                                   ║
 * ║    Cada componente puede testearse aisladamente                    ║
 * ║    Mock observers para testing                                    ║
 * ║                                                                    ║
 * ╚════════════════════════════════════════════════════════════════════╝
 */

export {};
