const {Speciality} = require("./entities/speciality.entity.js");

export class SpecialityModel {
    getSpecialitiesModel() {
        return Speciality.findAll();
    }

    async getSpecialityByIdModel(id: number) {
        const speciality = await Speciality.findByPk(id);
        if (!speciality) {
            throw new Error("Especialidad no encontrada");
        }
        return speciality;
    }

    async getSpecialityByNameModel(name: string) {
        const speciality = await Speciality.findOne({ where: { name } });
        if (!speciality) {
            throw new Error("Especialidad no encontrada");
        }
        return speciality;
    }
}