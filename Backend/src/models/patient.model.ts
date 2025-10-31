import type { Observer } from "../interface/observer";
import type { Subject } from "../interface/subject";
import { Patient } from "./entities/patient.entity";

export class PatientModel {
  private data: Patient[];
  private id: number;

  constructor() {
    this.data = [];

    this.data.push(
      new Patient(
        1,
        "Juan",
        "Pérez",
        "juan.perez@example.com",
        "32456789",
        "3511234567"
      )
    );

    this.data.push(
      new Patient(
        2,
        "María",
        "González",
        "maria.gonzalez@example.com",
        "29876543",
        "3515678901"
      )
    );

    this.id = 3;
  }

  getData(): Patient[] {
    return this.data;
  }

  getPatientById(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const identify = Number(id);
        const patientFound = this.data.find((p) => p.getId() === identify);
        resolve(patientFound || null);
      } catch (error) {
        reject(error);
      }
    });
  }

  createPatient(patient: Patient) {
    return new Promise((resolve, reject) => {
      try {
        patient.setId(this.id);
        this.id++;
        const patientFound = this.data.find(
          (p) =>
            p.getDni() === patient.getDni() ||
            p.getEmail() === patient.getEmail()
        );
        if (patientFound === null || patientFound === undefined) {
          this.data.push(patient);
        } else {
          throw new Error("Patient with the same DNI or Email already exists");
        }
        resolve(patient);
      } catch (error) {
        reject(error);
      }
    });
  }

  updatePatient(id: number, patient: Patient) {
    return new Promise((resolve, reject) => {
      try {
        const identify = Number(id);
        const patientFound = this.data.find((p) => p.getId() === identify);
        if (patientFound) {
          patientFound.setName(patient.getName());
          patientFound.setLastName(patient.getLastName());
          patientFound.setEmail(patient.getEmail());
          patientFound.setDni(patient.getDni());
          patientFound.setPhoneNumber(patient.getPhoneNumber());
          resolve(patientFound);
        } else {
          resolve(null);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  deletePatient(id: number) {
    return new Promise((resolve, reject) => {
      try {
        const identify = Number(id);
        const patientFound = this.data.find((p) => p.getId() === identify);
        if (!patientFound) {
          throw new Error("Patient not found");
        }
        const index = this.data.indexOf(patientFound);
        this.data.splice(index, 1);
        resolve(patientFound);
      } catch (error) {
        reject(error);
      }
    });
  }

  listPatients() {
    return new Promise<Patient[]>((resolve, reject) => {
      try {
        resolve(this.data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
