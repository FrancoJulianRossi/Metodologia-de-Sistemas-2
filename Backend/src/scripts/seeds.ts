// Script to create tables and insert seed data into sqlite DB
const path = require("path");
const { connectDB } = require("../models/sqlite/config/db");

async function seed() {
  try {
    // Require entities first so Sequelize model definitions are registered
    const {
      Speciality,
    } = require("../models/sqlite/entities/speciality.entity");
    const { Medic } = require("../models/sqlite/entities/medic.entity");
    const { Patient } = require("../models/sqlite/entities/patient.entity");
    const {
      Appointment,
    } = require("../models/sqlite/entities/appointment.entity");

    // Then sync DB to create tables
    await connectDB();

    // Clear tables (if any) - use destroy with truncate for safety
    await Appointment.destroy({ where: {}, truncate: true, force: true });
    await Medic.destroy({ where: {}, truncate: true, force: true });
    await Patient.destroy({ where: {}, truncate: true, force: true });
    await Speciality.destroy({ where: {}, truncate: true, force: true });

    // Create specialities
    const cardiology = await Speciality.create({ name: "Cardiology" });
    const dermatology = await Speciality.create({ name: "Dermatology" });
    const pediatrics = await Speciality.create({ name: "Pediatrics" });

    console.log("Specialities created:", [
      cardiology.name,
      dermatology.name,
      pediatrics.name,
    ]);

    // Create medics
    const medic1 = await Medic.create({
      name: "Alice",
      lastname: "Garcia",
      email: "alice.garcia@example.com",
      id_specialty: cardiology.id,
    });
    const medic2 = await Medic.create({
      name: "Bruno",
      lastname: "Lopez",
      email: "bruno.lopez@example.com",
      id_specialty: dermatology.id,
    });

    console.log("Medics created:", [medic1.email, medic2.email]);

    // Create patients
    const patient1 = await Patient.create({
      dni: "12345678",
      name: "Carlos",
      lastname: "Perez",
      email: "carlos.perez@example.com",
      password: "pass123",
      phoneNumber: 123456789,
    });
    const patient2 = await Patient.create({
      dni: "87654321",
      name: "Diana",
      lastname: "Martinez",
      email: "diana.martinez@example.com",
      password: "pass123",
      phoneNumber: 987654321,
    });

    console.log("Patients created:", [patient1.email, patient2.email]);

    // Create appointments
    await Appointment.create({
      date: new Date("2025-01-10"),
      time: "09:00",
      status: "confirmed",
      id_patient: patient1.id,
      id_medic: medic1.id,
    });
    await Appointment.create({
      date: new Date("2025-01-11"),
      time: "14:30",
      status: "cancelled",
      id_patient: patient2.id,
      id_medic: medic2.id,
    });

    console.log("Appointments created");

    // Print inserted rows for verification
    const allSpecialities = await Speciality.findAll({ raw: true });
    const allMedics = await Medic.findAll({ raw: true });
    const allPatients = await Patient.findAll({ raw: true });
    const allAppointments = await Appointment.findAll({ raw: true });

    console.log("--- Seeded data ---");
    console.log("Specialities:", allSpecialities);
    console.log("Medics:", allMedics);
    console.log("Patients:", allPatients);
    console.log("Appointments:", allAppointments);

    // Close sequelize and print the actual storage path used
    const { sequelize } = require("../models/sqlite/config/db");
    await sequelize.close();

    console.log(
      "Seeding complete. Database file at:",
      sequelize.options.storage || "unknown"
    );
  } catch (err: any) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seed();