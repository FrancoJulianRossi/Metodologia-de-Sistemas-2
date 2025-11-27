import axios from "axios";

const API_URL = "http://localhost:3000/api/patients/";

export const getAllPatients = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response && response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPatientById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    if (response && response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPatientByDni = async (dni: string) => {
  try {
    const response = await axios.get(`${API_URL}dni=${dni}`);
    if (response && response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createPatient = async (patientData: any) => {
  try {
    const response = await axios.post(API_URL, patientData);
    if (response && response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updatePatient = async (id: string, patientData: any) => {
  try {
    const response = await axios.put(`${API_URL}${id}`, patientData);
    if (response && response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePatient = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`);
    if (response && response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getAllPatients,
  getPatientById,
  getPatientByDni,
  createPatient,
  updatePatient,
  deletePatient,
};
