# Metodologia-de-Sistemas-2
## Participantes:

    .Franco Julian Rossi

    .Martin Andres Garnica

    .Manuel Galdames

    .Santiago Recari

## Tema:

**Aplicacion de gestion de turnos.**

## Patrones:

 **Patrón Creacional: Singleton**


La conexión a la base de datos debe ser única para evitar múltiples conexiones innecesarias.

La configuración global (por ejemplo, datos de la clínica, horarios de atención, parámetros de email/SMS para notificaciones) debe manejarse desde un único lugar.

Evita inconsistencias: todos los módulos acceden al mismo objeto.

 **Patrón de Comportamiento: Observer**

Cada vez que un turno cambia de estado (reservado, confirmado, cancelado, completado), distintos interesados necesitan ser notificados:

El paciente.

El médico.

Evita tener lógica rígida y acoplada. No hace falta que la clase Turno sepa cómo notificar a cada actor, solo dispara el evento.