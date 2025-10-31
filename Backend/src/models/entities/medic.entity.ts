import { Specialty } from "./specialty.entity";

export class Medic {

    constructor(
        protected id: number,
        protected name: string,
        protected lastname: string,
        protected email: string,
        protected idSpecialty: number) { }

    // Getters
    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getLastname(): string {
        return this.lastname;
    }

    getEmail(): string {
        return this.email;
    }

    getIdSpecialty(): number {
        return this.idSpecialty;
    }

    // Setters
    setName(value: string) {
        if (value.trim().length === 0) throw new Error("El nombre no puede estar vacío");
        this.name = value;
    }
    setLastname(value: string) {
        if (value.trim().length === 0) throw new Error("El apellido no puede estar vacío");
        this.lastname = value;
    }

    setEmail(value: string) {
        if (!value.includes("@")) throw new Error("El email no es válido");
        this.email = value;
    }

    setIdSpecialty(value: number): void {
        this.idSpecialty = value;
    }
}
