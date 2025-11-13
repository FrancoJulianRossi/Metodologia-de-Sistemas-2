# Patrón Observer - Notificaciones de Appointments

## 📋 Descripción

Se ha implementado el **patrón de diseño Observer** para notificar automáticamente al paciente y al médico cuando ocurren cambios en los appointments (citas médicas).

## 🎯 Casos de Uso

El sistema notifica automáticamente en los siguientes casos:

1. **Reprogramación de turno** - Cuando cambia la fecha o hora
2. **Cancelación de turno** - Cuando el status cambia a "cancelled" o se elimina
3. **Confirmación de turno** - Cuando el status cambia a "confirmed"
4. **Otros cambios** - Cambios genéricos en el estado del turno

## 📁 Estructura de Archivos

```
src/
├── observer/
│   ├── observer.interface.ts          # Interfaz que deben cumplir todos los observadores
│   ├── appointment.subject.ts         # Observable - gestiona observadores y notificaciones
│   ├── patient.observer.ts            # Observador concreto para pacientes
│   ├── medic.observer.ts              # Observador concreto para médicos
│   └── OBSERVER_PATTERN_EXAMPLE.ts    # Documentación y ejemplos
├── services/
│   └── notification.service.ts        # Servicio centralizado de notificaciones
└── controllers/
    └── appointment.controller.ts      # Controlador actualizado con Observer
```

## 🏗️ Componentes

### 1. **Observer Interface** (`observer.interface.ts`)

Define el contrato que deben cumplir todos los observadores:

```typescript
export interface Observer {
  update(appointmentData: any): Promise<void>;
}
```

### 2. **AppointmentSubject** (`appointment.subject.ts`)

Observable que gestiona la lista de observadores y dispara notificaciones:

- `attach(observer)` - Registra un observador
- `detach(observer)` - Desregistra un observador
- `notifyObservers(data)` - Notifica a todos los observadores
- `getObserverCount()` - Retorna el número de observadores registrados

### 3. **PatientObserver** (`patient.observer.ts`)

Observador concreto que:

- Escucha cambios en appointments
- Envía notificaciones personalizadas al paciente
- Adapta el mensaje según el tipo de cambio

### 4. **MedicObserver** (`medic.observer.ts`)

Observador concreto que:

- Escucha cambios en appointments
- Envía notificaciones personalizadas al médico
- Incluye información del paciente en las notificaciones

### 5. **NotificationService** (`notification.service.ts`)

Servicio centralizado para:

- Enviar notificaciones
- Almacenar historial de notificaciones
- Loguear eventos importantes
- Base para futuras integraciones (email, SMS, push notifications)

## 🔄 Flujo de Ejecución

```
1. Cliente hace PUT a /appointments/:id
                    ↓
2. AppointmentController.update()
   - Obtiene appointment actual
   - Realiza la actualización
   - Detecta el tipo de cambio
                    ↓
3. appointmentSubject.notifyObservers()
                    ↓
4. Itera sobre todos los observadores
   ├─ PatientObserver.update()
   │   └─ NotificationService.sendNotification()
   │
   └─ MedicObserver.update()
       └─ NotificationService.sendNotification()
                    ↓
5. Notificaciones enviadas
```

## 📡 Uso en el Controlador

El `AppointmentController` ahora implementa automáticamente las notificaciones:

```typescript
// En la actualización (PUT)
const changeType = detectChangeType(currentAppointment, updatedAppointment);
await appointmentSubject.notifyObservers({
  id: Number(id),
  ...updatedAppointment.dataValues,
  changeType,
});

// En la eliminación (DELETE)
await appointmentSubject.notifyObservers({
  id: Number(id),
  ...appointment.dataValues,
  changeType: "cancelled",
  status: "cancelled",
});
```

## 📝 Ejemplos de API

### Reprogramar un turno

```bash
PUT /appointments/5
Content-Type: application/json

{
  "date": "2024-12-20",
  "time": "15:30",
  "status": "pending",
  "id_patient": 1,
  "id_medic": 2
}
```

**Notificaciones:**

- Paciente: "Tu turno ha sido reprogramado para el 2024-12-20 a las 15:30"
- Médico: "El turno del paciente (ID: 1) ha sido reprogramado para el 2024-12-20 a las 15:30"

### Cancelar un turno

```bash
PUT /appointments/5
Content-Type: application/json

{
  "date": "2024-12-15",
  "time": "14:00",
  "status": "cancelled",
  "id_patient": 1,
  "id_medic": 2
}
```

**Notificaciones:**

- Paciente: "Tu turno ha sido cancelado"
- Médico: "El turno del paciente (ID: 1) ha sido cancelado"

### Eliminar un turno

```bash
DELETE /appointments/5
```

**Notificaciones:**

- Paciente: "Tu turno ha sido cancelado"
- Médico: "El turno del paciente (ID: 1) ha sido cancelado"

## 🔌 Extensibilidad

Para agregar más observadores (por ejemplo, para enviar emails):

```typescript
// 1. Crear nuevo observador
export class EmailNotificationObserver implements Observer {
  async update(appointmentData: any): Promise<void> {
    // Lógica para enviar emails
  }
}

// 2. Registrarlo en AppointmentController
const emailObserver = new EmailNotificationObserver(emailService);
appointmentSubject.attach(emailObserver);
```

## 🚀 Mejoras Futuras

1. **Notificaciones por Email** - Integrar servicio de email
2. **Notificaciones por SMS** - Enviar mensajes de texto
3. **Push Notifications** - Implementar notificaciones en la app
4. **Base de Datos** - Persistir notificaciones en BD
5. **Autenticación Real** - Usar sistema de notificaciones en tiempo real (WebSockets/Socket.io)

## ✅ Ventajas del Patrón Observer

✓ **Desacoplamiento** - Controlador no depende directamente de la lógica de notificaciones
✓ **Extensibilidad** - Fácil agregar nuevos observadores
✓ **Mantenibilidad** - Cada observador es responsable de su propia lógica
✓ **Reutilización** - El mismo Observable puede notificar a múltiples observadores
✓ **Testabilidad** - Cada componente puede testearse independientemente

## 📚 Más Información

Ver `OBSERVER_PATTERN_EXAMPLE.ts` para ejemplos detallados de uso.
