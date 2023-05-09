const { DataTypes } = require("sequelize");

const sequelize = require("~/services/sequelize.service");
const StoreModel = require("./store.model");

const UserModel = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
        },
        phone: {
            type: DataTypes.STRING,
        },
        staff:{
            type: DataTypes.BOOLEAN,
			defaultValue: false,
        },
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);

UserModel.belongsTo(StoreModel, {
    foreignKey: "store_id"
})

module.exports = UserModel;