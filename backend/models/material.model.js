const { DataTypes } = require("sequelize");
const MaterialTypeModel = require("~/models/material_type.model")

const sequelize = require("~/services/sequelize.service");

const MaterialModel = sequelize.define(
    "material",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true, 
            primaryKey:true
        },
        name:{
            type: DataTypes.TEXT, 
            allowNull:false
        }, 
        code: {
            type: DataTypes.TEXT, 
        },
        expiry: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        description: {
            type: DataTypes.TEXT,
        }
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);

MaterialModel.belongsTo(MaterialTypeModel, {
    foreignKey: "material_type_id",
    allowNull: false
});

module.exports = MaterialModel;