const { DataTypes } = require("sequelize");

const sequelize = require("~/services/sequelize.service");
const BillModel = require("./bill.model");
const MaterialModel = require("./material.model");

const BillDetailsModel = sequelize.define(
    "bill_details",
    {
        quantity:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        price:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        material_id: {
            type: DataTypes.INTEGER,
            references: {
                model: MaterialModel,
                key: 'id',
            },
            allowNull: false
        },
        bill_id:{
            type: DataTypes.INTEGER,
            references: {
                model: BillModel,
                key: 'id',
            },
        }
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);


module.exports = BillDetailsModel;