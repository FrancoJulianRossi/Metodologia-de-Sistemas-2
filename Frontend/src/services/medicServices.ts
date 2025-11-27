import axios from "axios";

const API_URL = "http://localhost:3000/medics";

// Wrapper para mantener la consistencia con patientService (devuelve response.data.data cuando existe)
export const medicService = {
    getAll: async () => {
        const res = await axios.get(API_URL);
        if (res && res.data && res.data.data !== undefined) return res.data.data;
        return res.data;
    },

    getById: async (id: number) => {
        const res = await axios.get(`${API_URL}/${id}`);
        if (res && res.data && res.data.data !== undefined) return res.data.data;
        return res.data;
    },
    create: async (data: {
        name: string;
        lastname: string;
        email: string;
        id_specialty: number;
    }) => {
        const res = await axios.post(API_URL, data);
        if (res && res.data && res.data.data !== undefined) return res.data.data;
        return res.data;
    },

    update: async (
        id: number,
        data: {
            name?: string;
            lastname?: string;
            email?: string;
            id_specialty?: number;
        }
    ) => {
        const res = await axios.put(`${API_URL}/${id}`, data);
        if (res && res.data && res.data.data !== undefined) return res.data.data;
        return res.data;
    },

    delete: async (id: number) => {
        const res = await axios.delete(`${API_URL}/${id}`);
        if (res && res.data && res.data.data !== undefined) return res.data.data;
        return res.data;
    },
    getByEmail: async (email: string) => {
        const res = await axios.get(`${API_URL}/email?email=${encodeURIComponent(email)}`);
        if (res && res.data && res.data.data !== undefined) return res.data.data;
        return res.data;
    },

    getBySpecialty: async (specialtyId: number) => {
        const res = await axios.get(`${API_URL}/specialty/${specialtyId}`);
        if (res && res.data && res.data.data !== undefined) return res.data.data;
        return res.data;
    },

    getBySpecialtyName: async (specialtyName: string) => {
        const res = await axios.get(`${API_URL}/specialty-name/${encodeURIComponent(specialtyName)}`);
        if (res && res.data && res.data.data !== undefined) return res.data.data;
        return res.data;
    },
};