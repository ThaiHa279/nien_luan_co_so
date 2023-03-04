const { DataTypes } = require("sequelize");

const sequelize = require("~/services/sequelize.service");
const MaterialModel = require("./material.model");
const OrderModel = require("./order.model");

const  OrderDetailsModel= sequelize.define(
    "order_details",
    {
        quantity:{
            type: DataTypes.INTEGER,
            allowNull:false
        }, 
        price: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);
MaterialModel.belongsToMany(OrderModel, {
    through: OrderDetailsModel, 
    foreignKey: "material_id"
});
OrderModel.belongsToMany(MaterialModel, {
    through: OrderDetailsModel, 
    foreignKey: "store_id"
})

module.exports = OrderDetailsModel;