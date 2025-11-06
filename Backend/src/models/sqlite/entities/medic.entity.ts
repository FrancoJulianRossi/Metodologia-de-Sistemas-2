const { DataTypes } = require("sequelize");
const { sequelize } = require("./../config/db.js");

const Medic = sequelize.define(
    "Medic",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
            allowNull: false
        },
        id_specialty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Speciality',
                key: 'id'
            }
        }
    },
    {
        tableName: "Medic"
    }
);
Medic.associate = (models: any) => {
    if (models.Speciality) {
        Medic.belongsTo(models.Speciality, {
            foreignKey: 'id_specialty',
            as: 'specialty'
        });
    }
};

module.exports = { Medic };