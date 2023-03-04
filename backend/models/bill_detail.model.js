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
        }
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);
MaterialModel.belongsToMany(BillModel, {
    through: BillDetailsModel, 
    foreignKey: "material_id"
});
BillModel.belongsToMany(MaterialModel, {
    through: BillDetailsModel, 
    foreignKey: "bill_id"
})


module.exports = BillDetailsModel;