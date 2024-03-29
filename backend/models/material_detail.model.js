const { DataTypes } = require("sequelize");

const sequelize = require("~/services/sequelize.service");
const MaterialModel = require("./material.model");
const StoreModel = require("./store.model");

const MaterialDetailsModel = sequelize.define(
    "material_details",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull:false
        }, 
        need: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        local: {
            type: DataTypes.STRING,
        },
        material_id: {
            type: DataTypes.INTEGER,
            references: {
                model: MaterialModel,
                key: 'id',
            },
            allowNull: false
        },
        store_id:{
            type: DataTypes.INTEGER,
            references: {
                model: StoreModel,
                key: 'id',
            },
            allowNull: false    
        }
    },
    { initialAutoIncrement: 1000, timestamps: true, paranoid: true }
);

// MaterialModel.belongsToMany(StoreModel, {
//     through: MaterialDetailsModel, 
//     foreignKey: "material_id"
// });
// StoreModel.belongsToMany(MaterialModel, {
//     through: MaterialDetailsModel, 
//     foreignKey: "store_id"
// })

module.exports = MaterialDetailsModel;