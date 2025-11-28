/**
 * Servicio para consumir la API de turnos (appointments).
 * Expone funciones para CRUD: crear, listar, obtener, actualizar, eliminar.
 */
const API_URL = 'http://localhost:3000/appointments';

// Servicio de citas: funciones para consumir la API de appointments

// Obtiene todas las citas desde el servidor
export const getAllAppointments = async () => {
  const response = await fetch(API_URL);
  return response.json();
}

// Obtiene una cita específica por ID
export const getAppointmentById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

// Crea una nueva cita enviando POST con los datos de la cita
export const createAppointment = async (appointmentData: any) => {
    const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointmentData),
  });
  return response.json();
}

// Actualiza una cita existente con nuevos datos
export const updateAppointment = async (id: string, appointmentData: any) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointmentData),
  });
  return response.json();
}

// Elimina una cita por ID
export const deleteAppointment = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}