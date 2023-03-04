const { DataTypes } = require("sequelize");

const sequelize = require("~/services/sequelize.service")

const GRNModel = sequelize.define(
    "grn",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE, 
            allowNull:false
        }
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);

module.exports = GRNModel;