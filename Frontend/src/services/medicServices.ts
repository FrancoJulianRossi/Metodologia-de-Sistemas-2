// src/services/medicService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/medics";

export const medicService = {
    // Obtener todos los médicos
    getAll: () => axios.get(API_URL),

    // Obtener médico por ID
    getById: (id: number) => axios.get(`${API_URL}/${id}`),

    // Crear médico
    create: (data: {
        name: string;
        lastname: string;
        email: string;
        id_specialty: number;
    }) => axios.post(API_URL, data),

    // Actualizar médico
    update: (
        id: number,
        data: {
            name: string;
            lastname: string;
            email: string;
            id_specialty: number;
        }
    ) => axios.put(`${API_URL}/${id}`, data),

    // Eliminar médico
    delete: (id: number) => axios.delete(`${API_URL}/${id}`),

    // Obtener médico por email
    getByEmail: (email: string) =>
        axios.get(`${API_URL}/email/${email}`),

    // Obtener médicos por especialidad
    getBySpecialty: (specialtyId: number) =>
        axios.get(`${API_URL}/specialty/${specialtyId}`)
};
