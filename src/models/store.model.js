"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../configs/database");
const baseModelFields_1 = require("../interfaces/baseModelFields");
exports.StoreModel = database_1.sequelizeInit.define('Stores', {
    ...baseModelFields_1.BaseModelFields,
    storeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    storeName: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    storeLocation: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'stores',
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    engine: 'InnoDB'
});
