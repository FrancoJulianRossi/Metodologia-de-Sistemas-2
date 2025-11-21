const {Speciality} = require("./entities/speciality.entity.js");

export class SpecialityModel {
    async getSpecialities() {
        return Speciality.findAll();
    }

    async getSpecialityById(id: number) {
        const speciality = await Speciality.findByPk(id);
        if (!speciality) {
            throw new Error("Especialidad no encontrada");
        }
        return speciality;
    }

    async getSpecialityByName(name: string) {
        const speciality = await Speciality.findOne({ where: { name } });
        if (!speciality) {
            throw new Error("Especialidad no encontrada");
        }
        return speciality;
    }
    async create(specialityData: { name: string; description: string }) {
        return Speciality.create(specialityData);
    }
    async update(id: number, specialityData: { name?: string; description?: string }) {
        const speciality = await this.getSpecialityById(id);
        return speciality.update(specialityData);
    }

    async delete(id: number) {
        const speciality = await this.getSpecialityById(id);
        return speciality.destroy();
    }


}