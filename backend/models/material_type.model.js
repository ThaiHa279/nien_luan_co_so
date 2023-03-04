const { DataTypes } = require("sequelize");

const sequelize = require("~/services/sequelize.service")

const  MaterialTypeModel = sequelize.define(
    "material_type",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        }, 
        unit: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);

module.exports = MaterialTypeModel;