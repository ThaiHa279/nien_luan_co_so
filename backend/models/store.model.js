const { DataTypes } = require("sequelize");

const sequelize = require("~/services/sequelize.service")

const  StoreModel= sequelize.define(
    "store",
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:true, 
            autoIncrement: true,
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING
        }, 
        mail: {
            type: DataTypes.STRING
        },
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);

module.exports = StoreModel;