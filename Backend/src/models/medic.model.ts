import { Medic } from "./entities/medic.entity.js";

export class MedicModel {
    private data: Medic[];

    constructor() {
        this.data = [];

        this.data.push(
            new Medic(1, "Carlos", "Pérez", "carlos.perez@clinica.com", 1)
        );
        this.data.push(
            new Medic(2, "María", "González", "maria.gonzalez@clinica.com", 2)
        );
        this.data.push(
            new Medic(3, "Javier", "Martínez", "javier.martinez@clinica.com", 3)
        );
    }

    getAll(): Medic[] {
        return this.data;
    }

    getById(id: number): Medic | undefined {
        return this.data.find((m) => m.getId() === id);
    }

    create(medicData: Omit<Medic, "getId" | "setId">): Medic {
        const newId =
            this.data.length > 0
                ? Math.max(...this.data.map((m) => m.getId())) + 1
                : 1;

        const newMedic = new Medic(
            newId,
            medicData.getName(),
            medicData.getLastname(),
            medicData.getEmail(),
            medicData.getIdSpecialty()
        );

        this.data.push(newMedic);
        return newMedic;
    }

    update(
        id: number,
        updatedData: {
            name?: string;
            lastname?: string;
            email?: string;
            idSpecialty?: number;
        }
    ): Medic | null {
        const medic = this.getById(id);
        if (!medic) return null;

        if (updatedData.name) medic.setName(updatedData.name);
        if (updatedData.lastname) medic.setLastname(updatedData.lastname);
        if (updatedData.email) medic.setEmail(updatedData.email);
        if (updatedData.idSpecialty)
            medic.setIdSpecialty(updatedData.idSpecialty);

        return medic;
    }

    delete(id: number): boolean {
        const index = this.data.findIndex((m) => m.getId() === id);
        if (index === -1) return false;

        this.data.splice(index, 1);
        return true;
    }
}

