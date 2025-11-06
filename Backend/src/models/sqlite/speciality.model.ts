const {Speciality} = require("./entities/speciality.entity.js");

class SpecialityModel {
    getSpecialitiesModel() {
        const specialities = Speciality.findAll();
        return specialities;
    }
    getSpecialityByIdModel(id: number) {
        return new Promise((resolve, reject) => {
            const speciality = Speciality.findByPk(id);
            if (!speciality) {
                reject(new Error("Especialidad no encontrada"));
            }
            resolve(speciality);
        });
    }
}

module.exports = new SpecialityModel();