const { DataTypes } = require("sequelize");

const sequelize = require("~/services/sequelize.service");
const GRNModel = require("./grn.model");
const MaterialModel = require("./material.model");

const  GRNDetailsModel= sequelize.define(
    "grn_details",
    {
        quantity:{
            type: DataTypes.INTEGER,
            allowNull:false
        }, 
        price: {
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
        grn_id:{
            type: DataTypes.INTEGER,
            references: {
                model: GRNModel,
                key: 'id',
            },
            allowNull: false
        }
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);

// MaterialModel.belongsToMany(GRNModel, {
//     through: GRNDetailsModel, 
//     foreignKey: "material_id"
// });
// GRNModel.belongsToMany(MaterialModel, {
//     through: GRNDetailsModel, 
//     foreignKey: "grn_id"
// })
module.exports = GRNDetailsModel;