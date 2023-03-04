const { DataTypes } = require("sequelize");

const sequelize = require("~/services/sequelize.service")

const OrderModel = sequelize.define(
    "order",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull:false
        },
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);

module.exports =OrderModel ;