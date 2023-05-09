const { DataTypes } = require("sequelize");

const sequelize = require("~/services/sequelize.service");

const StatisticModel = sequelize.define(
    "statistic",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: DataTypes.STRING, 
            allowNull: false,
        }, 
        profit: {
            type: DataTypes.DOUBLE, 
            allowNull: false,
        }
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);

module.exports =StatisticModel;