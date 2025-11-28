// Entidad Sequelize: Appointment (Turnos)
// Representa los turnos agendados entre pacientes y médicos.
// Campos principales:
// - id: PK autoincremental
// - date, time, status: información del turno
// - id_patient, id_medic: FKs hacia Patient.id y Medic.id
const { DataTypes } = require("sequelize");
const { sequelize } = require("./../config/db.js");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // necesito hacer lo mismo para time y status.
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // id patient y id medic como foreign keys
    id_patient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Patient",
        key: "id",
      },
    },
    id_medic: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Medic",
        key: "id",
      },
    },
  },
  {
    tableName: "Appointment",
  }
);
module.exports = { Appointment };