const { DataTypes } = require("sequelize");

const sequelize = require("~/services/sequelize.service");
const StoreModel = require("./store.model");
const UserModel = require("./user.model");

const BillModel = sequelize.define(
    "bill",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
    },
    
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);

BillModel.belongsTo(UserModel, {
    foreignKey: "staff_id",
});
BillModel.belongsTo(UserModel, {
    foreignKey: "client_id",
});
BillModel.belongsTo(StoreModel, {
    foreignKey: "store_id",
});


module.exports = BillModel ;