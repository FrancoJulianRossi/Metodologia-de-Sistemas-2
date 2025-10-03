# Metodologia-de-Sistemas-2
## Participantes:

    Franco Julian Rossi

    Martin Andres Garnica

    Manuel Galdames

    Santiago Recari

## Tema:

**Aplicacion de gestion de turnos.**

Este proyecto consiste en una aplicación de gestión de turnos para clínicas o consultorios médicos.
El objetivo es facilitar la reserva, modificación y seguimiento de turnos para pacientes y médicos, incorporando notificaciones automáticas y utilizando patrones de diseño para mejorar la organización y escalabilidad del sistema.

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

## Diagrama entidad relacion

![DiagramaER](docs/DiagramaER.png)

## Tecnologías propuestas

- Base de datos: MySQL / PostgreSQL
- Backend: Node.js
- Patrones de diseño: Singleton, Observer