// Base URL for the appointments API endpoint
const API_URL = 'http://localhost:3000/api/appointments';

// Fetches all appointments from the server
export const getAllAppointments = async () => {
  const response = await fetch(API_URL);
  return response.json();
}

// Fetches a specific appointment by its ID
export const getAppointmentById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

// Creates a new appointment by sending POST request with appointment data
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

// Updates an existing appointment with new data
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

// Deletes an appointment by ID
export const deleteAppointment = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}