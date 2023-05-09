const { DataTypes } = require("sequelize");

const sequelize = require("~/services/sequelize.service");
const UserModel = require("./user.model");

const OrderModel = sequelize.define(
    "order",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        payment: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        delivery_to: {
            type: DataTypes.STRING, 
        }
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);
OrderModel.belongsTo(UserModel, {
    foreignKey: "user_id",
    allowNull: false
});
module.exports =OrderModel ;