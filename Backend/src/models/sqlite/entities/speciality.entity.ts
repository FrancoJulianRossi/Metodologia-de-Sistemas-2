const { DataTypes } = require("sequelize");
const { sequelize } = require("./../config/db.js");

// Definición de la entidad Speciality para Sequelize
const Speciality = sequelize.define(
    "Speciality",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },

    },
    { tableName: "Speciality" }
);

module.exports = { Speciality };