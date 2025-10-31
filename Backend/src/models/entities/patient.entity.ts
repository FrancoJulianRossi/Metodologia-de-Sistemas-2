export class Patient {
  constructor(
    protected id: number,
    protected name: string,
    protected lastName: string,
    protected email: string,
    protected dni: string,
    protected phoneNumber: string
  ) {}

  // Getters
  getId(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getLastName(): string {
    return this.lastName;
  }
  getEmail(): string {
    return this.email;
  }
  getDni(): string {
    return this.dni;
  }
  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  // Setters

  setId(id: number): void {
    this.id = id;
  }
  setName(name: string): void {
    this.name = name;
  }
  setLastName(lastName: string): void {
    this.lastName = lastName;
  }
  setEmail(email: string): void {
    this.email = email;
  }
  setDni(dni: string): void {
    this.dni = dni;
  }
  setPhoneNumber(phoneNumber: string): void {
    this.phoneNumber = phoneNumber;
  }
}
