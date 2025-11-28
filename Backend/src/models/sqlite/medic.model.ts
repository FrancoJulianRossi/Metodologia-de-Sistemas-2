/**
 * Modelo de datos para `Medic` (médicos).
 *
 * Contiene las operaciones de acceso a datos (CRUD) usando las entidades
 * definidas por Sequelize. Los métodos lanzan errores con mensajes en
 * español para facilitar el consumo por los controladores.
 */
const { Medic } = require('../sqlite/entities/medic.entity.js');

class MedicModel {
    // Crea un nuevo registro de médico en la base de datos
    async create(medicData: any) {
        try {
            const newMedic = await Medic.create(medicData);
            return newMedic;
        } catch (error: any) {
            throw new Error("Error al crear el médico: " + error.message);
        }
    }

    // Obtiene todos los médicos
    async getAll() {
        try {
            const medics = await Medic.findAll();
            return medics;
        } catch (error: any) {
            throw new Error("Error al obtener los médicos: " + error.message);
        }
    }

    // Obtiene un médico por su ID (lanza si no existe)
    async getById(id: number) {
        try {
            const medic = await Medic.findByPk(id);
            if (!medic) {
                throw new Error("Médico no encontrado");
            }
            return medic;
        } catch (error: any) {
            throw new Error("Error al obtener el médico: " + error.message);
        }
    }

    // Actualiza un médico por ID con los datos proporcionados
    async update(id: number, medicData: any) {
        try {
            const medic = await Medic.findByPk(id);
            if (!medic) {
                throw new Error("Médico no encontrado");
            }
            
            const updatedMedic = await medic.update(medicData);
            return updatedMedic;
        } catch (error: any) {
            throw new Error("Error al actualizar el médico: " + error.message);
        }
    }

    // Elimina un médico por ID (lanza si no existe o hay error de FK)
    async delete(id: number) {
        try {
            const medic = await Medic.findByPk(id);
            if (!medic) {
                throw new Error("Médico no encontrado");
            }
            
            await medic.destroy();
            return true;
        } catch (error: any) {
            throw new Error("Error al eliminar el médico: " + error.message);
        }
    }

    // Busca un médico por su correo electrónico
    async getByEmail(email: string) {
        try {
            const medic = await Medic.findOne({
                where: { email: email }
            });
            return medic;
        } catch (error: any) {
            throw new Error("Error al obtener el médico por correo electrónico: " + error.message);
        }
    }

    // Lista médicos por ID de especialidad
    async getBySpecialty(specialtyId: number) {
        try {
            const medics = await Medic.findAll({
                where: { id_specialty: specialtyId }
            });
            return medics;
        } catch (error: any) {
            throw new Error("Error al obtener médicos por especialidad: " + error.message);
        }
    }
}

module.exports = new MedicModel();