const { DataTypes } = require("sequelize");
const UserModel = require("./user.model");
const sequelize = require("~/services/sequelize.service")
const StoreModel = require("./store.model");

const GRNModel = sequelize.define(
    "grn",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);

GRNModel.belongsTo(UserModel, {
    foreignKey: "staff_id",
});
GRNModel.belongsTo(StoreModel, {
    foreignKey: "store_id",
});
module.exports = GRNModel;