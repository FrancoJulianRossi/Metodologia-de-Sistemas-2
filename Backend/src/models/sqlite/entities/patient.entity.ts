// Entidad Sequelize: Patient (Pacientes)
// Representa a los pacientes en la base de datos.
// Campos principales:
// - id: PK autoincremental
// - dni: documento único
// - name, lastname, email, password, phoneNumber
const { DataTypes } = require("sequelize");
const { sequelize } = require("./../config/db.js");

const Patient = sequelize.define(
  "Patient",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dni: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "Patient" }
);

module.exports = { Patient };
