const { DataTypes } = require("sequelize");

const sequelize = require("~/services/sequelize.service")

const DistributorModel = sequelize.define(
    "distributor",
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
        phone: {
            type: DataTypes.STRING, 
        }, 
        address: {
            type: DataTypes.STRING, 
        },
        mail: {
            type: DataTypes.STRING, 
        }
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);

module.exports = DistributorModel;