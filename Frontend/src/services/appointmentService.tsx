const API_URL = 'http://localhost:3000/api/appointments';

export const getAllAppointments = async () => {
  const response = await fetch(API_URL);
  return response.json();
}
export const getAppointmentById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

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

export const deleteAppointment = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}