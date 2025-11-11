const { Medic } = require('../sqlite/entities/medic.entity.js');

class MedicModel {
    async create(medicData: any) {
        try {
            const newMedic = await Medic.create(medicData);
            return newMedic;
        } catch (error: any) {
            throw new Error("Error al crear el médico: " + error.message);
        }
    }

    async getAll() {
        try {
            const medics = await Medic.findAll();
            return medics;
        } catch (error: any) {
            throw new Error("Error al obtener los médicos: " + error.message);
        }
    }

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