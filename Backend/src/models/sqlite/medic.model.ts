const { Medic } = require('../sqlite/entities/medic.entity.js');

class MedicModel {
    async create(medicData: any) {
        try {
            const newMedic = await Medic.create(medicData);
            return newMedic;
        } catch (error: any) {
            throw new Error("Error creating medic: " + error.message);
        }
    }

    async getAll() {
        try {
            const medics = await Medic.findAll();
            return medics;
        } catch (error: any) {
            throw new Error("Error getting medics: " + error.message);
        }
    }

    async getById(id: number) {
        try {
            const medic = await Medic.findByPk(id);
            if (!medic) {
                throw new Error("Medic not found");
            }
            return medic;
        } catch (error: any) {
            throw new Error("Error getting medic: " + error.message);
        }
    }

    async update(id: number, medicData: any) {
        try {
            const medic = await Medic.findByPk(id);
            if (!medic) {
                throw new Error("Medic not found");
            }
            
            const updatedMedic = await medic.update(medicData);
            return updatedMedic;
        } catch (error: any) {
            throw new Error("Error updating medic: " + error.message);
        }
    }

    async delete(id: number) {
        try {
            const medic = await Medic.findByPk(id);
            if (!medic) {
                throw new Error("Medic not found");
            }
            
            await medic.destroy();
            return true;
        } catch (error: any) {
            throw new Error("Error deleting medic: " + error.message);
        }
    }

    async getByEmail(email: string) {
        try {
            const medic = await Medic.findOne({
                where: { email: email }
            });
            return medic;
        } catch (error: any) {
            throw new Error("Error getting medic by email: " + error.message);
        }
    }

    async getBySpecialty(specialtyId: number) {
        try {
            const medics = await Medic.findAll({
                where: { id_specialty: specialtyId }
            });
            return medics;
        } catch (error: any) {
            throw new Error("Error getting medics by specialty: " + error.message);
        }
    }
}

module.exports = new MedicModel();