export class Speciality {
    constructor(protected id: number, protected name: string) {}

// Getters
getId(): number {
    return this.id;
}
getName(): string {
    return this.name;
}
// Setters
setId(id: number): void {
    this.id = id;
}
setName(name: string): void {
    this.name = name;
}
}

export default Speciality;